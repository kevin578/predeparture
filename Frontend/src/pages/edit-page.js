import React from 'react'
import { connect } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Modal from 'react-modal'
import { Body, Header, Video, Text } from '../components/Subject/SubjectStyles'
import Checkbox from '../components/Subject/Checkbox'
import { Parser } from 'html-to-react'
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
import short from 'short-uuid';
import queryString from "query-string";

const Wrapper = styled.div`
  margin-top: -1px;
  display: grid;
  grid-template-columns: 400px 525px auto;
  grid-template-rows: 100px 120px 180px 50px 500px;
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

const Editor = styled(AceEditor)``

const EditorContainer = styled.div`
  height: 200px;
  grid-column-start: 2;
  grid-row-start: 2;
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

const NewPageButton = styled(HomemadeButton)`
  background: #504db7;
  grid-column-start: 3;
  grid-row-start: 2;
  margin-top: 50px;
`
const DeletePageButton = styled(HomemadeButton)`
  background: #d37e7e;
  grid-column-start: 3;
  grid-row-start: 3;
`

const SaveButton = styled(HomemadeButton)`
  background: #7ed399;
  grid-column-start: 2;
  grid-row-start: 4;
`

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
    width: 380,
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 150,
    padding: 0
  },
  overlay: {
    zIndex: 100 
  }
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

const editorTypes = (item, index) => {
  const key = `${item.type}${index}`
  switch (item.type) {
    case 'header':
      return <Header key = {key}>{item.props.children}</Header>
    case 'checkbox':
      return <Checkbox key = {key} >{item.props.children}</Checkbox>
    case 'text':
      return <Text key = {key}>{item.props.children}</Text>
    default:
      return
  }
}

class editPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: '',
      sidebarContent: '',
      title: '',
      isSaving: false,
      warning: '',
      showDeleteModal: false,
      href: window.location.href,
    }
  }

  componentDidMount() {
    this.loadContent()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page.number != this.state.href) {
      const oldTitle = this.state.title;
      const oldContent = this.state.editorContent;
      const {pageNumber} = queryString.parse(prevProps.location.search)
      this.setContent()
      this.setState({ href: prevProps.page.number })
      let  { contentArray } = prevProps.content;
      if(!contentArray[pageNumber]) return;
      contentArray[pageNumber].title = oldTitle;
      contentArray[pageNumber].content = oldContent;
      this.props.setContent(contentArray);
    }
  }

  loadContent = async () => {
    const content = await axios.get(
      'https://s2t7hro01h.execute-api.us-east-1.amazonaws.com/dev/getContent'
    )
    this.props.setContent(content.data)
    this.setContent()
  }

  setContent = async () => {
    const { page } = this.props
    const content = this.props.content.contentArray
    if (!content[page.number]) return
    const title = content[page.number].title
    const editorContent = content[page.number].content
    this.setState({ title, editorContent, content })
  }

  onChange = event => {
    const { name, value } = event.target
    window.onbeforeunload = () => ''
    this.setState({ [name]: value })
  }

  onEditorChange = newValue => {
    window.onbeforeunload = () => ''
    this.setState({ editorContent: newValue })
  }

  getContent = () => {
    const html = this.state.editorContent
    let editorArray = ReactHtmlParser(html)
    return editorArray.map((item, index) => {
      return editorTypes(item, index)
    })
  }

  newPage = () => {
    window.onbeforeunload = () => ''
    const newItem = {
      title: 'New Item',
      key: short.generate(),
      content: '<Header>New Item</Header>',
    }
    let { contentArray } = this.props.content
    const { page } = this.props
    contentArray.splice(page.number + 1, 0, newItem)
    this.props.setContent(contentArray)
  }

  deleteItem = () => {
    window.onbeforeunload = () => ''
    const  { contentArray } = this.props.content;
    const {page, setContent, setPage} = this.props;
    const newContent = contentArray.filter((item, index)=> {
      if(!(index === parseInt(page.number))) return item;
    })
    const newPageNumber = newPageNumber > 0 ? parseInt(page.number) - 1 : 0;
    setContent(newContent);
    setPage(newPageNumber);
    this.setState({
      title: newContent[newPageNumber].title,
      content: newContent[newPageNumber].content,
      showDeleteModal: false

    })
  }

  saveContent = async () => {
    const { editorContent, title } = this.state
    const { page, setContent } = this.props
    let newContent = this.props.content.contentArray
    newContent[page.number].title = title
    if (!title) return this.setState({ warning: 'Title cannot be blank.' })
    if (!editorContent)
      return this.setState({ warning: 'Content cannot be blank.' })
    this.setState({ isSaving: true })
    newContent[page.number].content = editorContent
    this.setState({ warning: '' })
    setContent(newContent)
    try {
      const response = await axios.put(
        'https://s2t7hro01h.execute-api.us-east-1.amazonaws.com/dev/updateContent',
        {
          contentArray: newContent,
        }
      )
    } catch (e) {
      console.log(e)
    }
    this.setState({ isSaving: false })
    window.onbeforeunload = null
  }

  getButton = () => {
    if (this.state.isSaving) {
      return <Progress />
    } else {
      return (
        <React.Fragment>
          <SaveButton onClick={this.saveContent}>Save</SaveButton>
          <ErrorMessage>{this.state.warning}</ErrorMessage>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
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
              value={this.state.title}
              onChange={this.onChange}
              name="title"
            />
            <Editor
              mode="html"
              theme="solarized_light"
              onChange={this.onEditorChange}
              value={this.state.editorContent}
              name="editor"
              editorProps={{ $blockScrolling: true }}
              width="500px"
              height="200px"
              fontSize={14}
              showGutter={false}
            />
          </EditorContainer>
          <NewPageButton onClick={this.newPage}>Add New Page</NewPageButton>
          <DeletePageButton onClick={()=> this.setState({showDeleteModal: true})}>
            Delete Page
          </DeletePageButton>
          {this.getButton()}
          <Modal
            isOpen={this.state.showDeleteModal}
            style={customStyles}
            contentLabel="Delete Modal"
            ariaHideApp={false}
          >
            <DeleteInstructions>Are you sure you want to delete the item <em>{this.state.title}</em>?</DeleteInstructions>
            <ButtonContainer>
              <GoBackButton onClick = {()=> this.setState({showDeleteModal: false})}>Nah, forget about it.</GoBackButton>
              <DeleteButton onClick = {this.deleteItem}>Yes, delete it.</DeleteButton>
            </ButtonContainer>
          </Modal>
          <Content>{this.getContent()}</Content>
        </Wrapper>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    content: state.content,
    page: state.page,
  }
}

export default connect(
  mapStateToProps,
  { setContent, setPage }
)(editPage)
