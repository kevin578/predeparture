import React from 'react'
import {connect} from "react-redux";
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'
import axios from "axios";
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

const dummyArray = [{ title: 'Get your passport', key: 'passport' }]


const Wrapper = styled.div`
margin-top: -1px;
  display: grid;
  grid-template-columns: 400px 525px auto;
  grid-template-rows: 100px 120px 180px 50px 500px;
`

const Navbar = styled(SiteHeader)`
`

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

const Editor = styled(AceEditor)`

`

const EditorContainer = styled.div`
  height: 200px;
  grid-column-start: 2;
  grid-row-start: 2;
`

const Button = styled.div`
  width: 120px;
  height: 40px;
  font-size: 12px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
`

const NewPageButton = styled(Button)`
background: #504DB7;
  grid-column-start: 3;
  grid-row-start: 2;
  margin-top: 50px;
`
const DeletePageButton = styled(Button)`
    background: #D37E7E;
    grid-column-start: 3;
    grid-row-start: 3;
`

const SaveButton = styled(Button)`
    background: #7ED399;
    grid-column-start: 2;
    grid-row-start: 4;
`

const Content = styled.div`
width: 800px;
grid-column-start: 2;
  grid-row-start: 5;
`

const editorTypes = item => {
  switch (item.type) {
    case 'header':
      return <Header>{item.props.children}</Header>
    case 'checkbox':
      return <Checkbox>{item.props.children}</Checkbox>
    case 'text':
      return <Text>{item.props.children}</Text>
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

    }
  }

  componentDidMount() {
    this.setContent();
  }


  setContent = async ()=> {
    let content = await axios.get("https://s2t7hro01h.execute-api.us-east-1.amazonaws.com/dev/getContent");
    content = content.data;
    console.log(content);
    const {page} = this.props;
    if (!(content[page.number])) return;
    const title = content[page.number].title;
    const editorContent = content[page.number].content
    this.setState({title, editorContent})

  }

  onChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value })
  }

  onEditorChange = newValue => {
    this.setState({ editorContent: newValue })
  }

  getContent = () => {
    const html = this.state.editorContent
    let editorArray = ReactHtmlParser(html)
    return editorArray.map(item => {
      return editorTypes(item)
    })
  }

  saveContent = ()=> {

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
              value = {this.state.title}
              onChange = {this.onChange}
              name = "title"
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
          <NewPageButton>Add New Page</NewPageButton>
          <DeletePageButton>Delete Page</DeletePageButton>
          <SaveButton onClick = {this.saveContent}>Save</SaveButton>
          <Content>{this.getContent()}</Content>
        </Wrapper>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    content: state.content,
    page: state.page
  }

}

export default connect(mapStateToProps)(editPage);


