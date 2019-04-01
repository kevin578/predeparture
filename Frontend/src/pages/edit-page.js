import React from 'react'
import { connect } from 'react-redux'
import { Link, navigate } from 'gatsby'
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { AddCircle, Delete, Image, Save, History } from '@material-ui/icons';
import Modal from 'react-modal'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import 'brace/mode/html'
import 'brace/theme/solarized_light'
import SiteHeader from '../components/siteHeader'
import Sidebar from '../components/Subject/Sidebar'
import { setContent, setPage } from './../state/actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import short from 'short-uuid'
import queryString from 'query-string'
import renderContent from '../lib/renderContent'
import AuthCheck from '../components/AuthCheck'
import LoadUserInfo from '../components/LoadUserInfo'
import MediaModal from '../components/MedialModal'
import { updatePageNumber } from '../functions'
import media from "../components/Subject/mediaQueries";
import { addContentToHistory, getContentHistory } from "../lib/crudFunctions";
import HistoryList from '../components/History';

const Wrapper = styled.div`
  margin-top: -1px;
  display: grid;
  grid-template-columns: 400px 525px auto;
  grid-template-rows: 100px 120px 180px 20px 500px;
`

const Navbar = styled(SiteHeader)``

const TitleLabel = styled.label`
  margin-right: 15px;
`

const TitleInput = styled.input`
  width: 400px;
  height: 30px;
  font-size: 16px;
  border-width: 0 0 1px 0;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-bottom-color: #4c6eff;
    border-bottom-width: 2px;
  }
`

const EditorContainer = styled.div`
  height: 200px;
  grid-column-start: 2;
  grid-row-start: 2;
  ${media.tablet`
    /* grid-column-start: 1;
    margin-left: 30px; */
  `}

`

const HomemadeButton = styled.div`
  width: 120px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
`

const IconContainer = styled.div`
  grid-column-start: 3;
  grid-row-start: 2;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  ${media.tablet`
    /* grid-column-start: 2;
    margin-left: 150px;
    padding-top: 25px; */
  `}

`

const iconStyles = {
  fontSize: 30,
  marginBottom: 10,
  cursor: "pointer"
}

const ErrorMessage = styled.p`
  grid-column-start: 2;
  grid-row-start: 4;
  margin-top: 50px;
  font-size: 14px;
  color: #cc3300;
`

const Content = styled.div`
  width: 800px;
  grid-column-start: 2;
  grid-row-start: 5;
  ${media.tablet`
    /* grid-column-start: 1;
    margin-left: 30px; */
  `}
`

const Progress = styled(CircularProgress)`
  && {
    display: block;
    position: relative;
    top: 10px;
    grid-column-start: 2;
    grid-row-start: 4;
  }
`

const customStyles = {
  content: {
    width: 390,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 150,
    padding: 0,
  },
  overlay: {
    zIndex: 110,
  },
}

const DeleteInstructions = styled.p`
  background: #f2f2f2;
  margin: 0px;
  padding: 25px;
`
const DeleteButton = styled(HomemadeButton)`
  background: #d37e7e;
  width: 150px;
`
const GoBackButton = styled(HomemadeButton)`
  background: #504db7;
  width: 150px;
`
const ButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
`

class editPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSaving: false,
      warning: '',
      showDeleteModal: false,
      showMediaModal: false,
      showHistory: false
    }
  }

  onTitleChange = event => {
    const { value } = event.target
    if (typeof window !== `undefined`) window.onbeforeunload = () => ''
    this.updateCurrentTitle(value);
  }

  onEditorChange = newValue => {
    if (typeof window !== `undefined`) window.onbeforeunload = () => '';
    this.updateCurrentContent(newValue);
  }

  contentIsAvailable = ()=> {
    const {content, page} = this.props;
    if (!content.contentArray) return false
    if (!content.contentArray[page.number]) return false;
    return true;
  }

  getCurrentTitle = ()=> {
    const {content, page} = this.props;
    if (!this.contentIsAvailable()) return ""
    return content.contentArray[page.number].title;
  }

  updateCurrentTitle = (newTitle)=> {
    const {content, page, setContent} = this.props;
    if (!this.contentIsAvailable()) return "";
    let newItems = content.contentArray;
    
    newItems[page.number].title = newTitle;
    setContent(newItems);
  }

  getCurrentContent = ()=> {
    const {content, page} = this.props;
    if (!this.contentIsAvailable()) return ""
    return content.contentArray[page.number].content;
  }

  updateCurrentContent = (newContent)=> {
    const {content, page, setContent} = this.props;
    if (!this.contentIsAvailable()) return "";
    let newItems = [...content.contentArray];
    newItems[page.number].content = newContent;
    setContent(newItems);
  }

  newPage = () => {
    if (typeof window !== `undefined`) window.onbeforeunload = () => ''
    const newItem = {
      title: 'New Item',
      key: short.generate(),
      content: '<Header>New Item</Header>',
    }

    let { contentArray } = this.props.content
    const { page } = this.props
    contentArray.splice(parseInt(page.number) + 1, 0, newItem)  
    this.props.setContent(contentArray)
    updatePageNumber(parseInt(page.number) + 1)
  }

  deleteItem = () => {
    if (typeof window !== `undefined`) window.onbeforeunload = () => ''
    const { contentArray } = this.props.content
    const { page, setContent, setPage } = this.props
    const newContent = contentArray.filter((item, index) => {
      if (!(index === parseInt(page.number))) return item
    })
    setContent(newContent)
    const newPageNumber = parseInt(page.number) > 0 ? parseInt(page.number) - 1 : 0
    updatePageNumber(newPageNumber);
    this.setState({
      showDeleteModal: false,
    })


  }

  saveContent = async () => {
    const { page, setContent, user, content } = this.props
    const userName = `${user.firstName} ${user.lastName}`

    if (!this.getCurrentTitle) return this.setState({ warning: 'Title cannot be blank.' })
    if (!this.getCurrentContent)
      return this.setState({ warning: 'Content cannot be blank.' })
    this.setState({ isSaving: true })
    this.setState({ warning: '' })
    
    try {
      await addContentToHistory(content.contentArray, userName);
    } catch (e) {
      console.log(e)
    }

    this.setState({ isSaving: false })
    if (typeof window !== `undefined`) window.onbeforeunload = null
  }

  getButton = () => {
    if (this.state.isSaving) {
      return <Progress />
    } else {
      return (
        <React.Fragment>
          <ErrorMessage>{this.state.warning}</ErrorMessage>
        </React.Fragment>
      )
    }
  }

  toggleHistory = ()=> {
    this.setState((prevState)=> {
      return {
        showHistory: !prevState.showHistory
      }
    })
  }

  render() {
    const { page } = this.props;
    const content = this.props.content.contentArray

    return (
      <AuthCheck authRedirect="/login" roleRedirect="/" role="admin">
        <Wrapper>
          <Navbar />
          <Sidebar
            title="Tasks"
            steps={this.props.content.contentArray}
            subject={this.props.urlName}
          />
          <EditorContainer>
            <TitleLabel>Title:</TitleLabel>
            <TitleInput
              value= {this.getCurrentTitle()}
              onChange={this.onTitleChange}
              name="title"
            />
            {typeof window !== 'undefined' && (
              <AceEditor
                mode="html"
                theme="solarized_light"
                onChange={this.onEditorChange}
                value={this.getCurrentContent()}
                name="editor"
                editorProps={{ $blockScrolling: true }}
                width="500px"
                height="200px"
                fontSize={14}
                showGutter={false}
                wrapEnabled={true}
                setOptions={{
                  indentedSoftWrap: false,
                }}
              />
            )}
          </EditorContainer>
          <IconContainer>
            <AddCircle style = {iconStyles} onClick={this.newPage}/>
            <Delete  style = {iconStyles} onClick={() => this.setState({ showDeleteModal: true })}/>
            <Image style = {iconStyles} onClick={() => this.setState({ showMediaModal: true })}/>
            <History style = {iconStyles} onClick={this.toggleHistory}/>
            <Save style = { iconStyles } onClick={this.saveContent}/>
          </IconContainer>
          <HistoryList showHistory = {this.state.showHistory} />

          {this.getButton()}
          <MediaModal
            isOpen={this.state.showMediaModal}
            closeModal={() => this.setState({ showMediaModal: false })}
          />
          <Modal
            isOpen={this.state.showDeleteModal}
            style={customStyles}
            contentLabel="Delete Modal"
            ariaHideApp={false}
          >
            <DeleteInstructions>
              Are you sure you want to delete the item{' '}
              <em>{this.state.title}</em>?
            </DeleteInstructions>
            <ButtonContainer>
              <GoBackButton
                onClick={() => this.setState({ showDeleteModal: false })}
              >
                Nah, forget about it.
              </GoBackButton>
              <DeleteButton onClick={this.deleteItem}>
                Yes, delete it.
              </DeleteButton>
            </ButtonContainer>
          </Modal>
          <Content>{renderContent(this.getCurrentContent())}</Content>

        </Wrapper>
      </AuthCheck>
    )
  }
}

function mapStateToProps(state) {
  return {
    content: state.content,
    page: state.page,
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  { setContent, setPage }
)(editPage)
