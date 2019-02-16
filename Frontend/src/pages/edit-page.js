import React from 'react'
import {connect} from "react-redux";
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'
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
      sidebarContent: ''
    }
  }

  onChange = newValue => {
    this.setState({ editorContent: newValue })
  }

  getContent = () => {
    const html = this.state.editorContent
    console.log(this.state.editorContent);
    let editorArray = ReactHtmlParser(html)

    return editorArray.map(item => {
      return editorTypes(item)
    })
  }

  render() {
    return (
      <React.Fragment>
    <Wrapper>
        <Navbar />
          <Sidebar
            title="Tasks"
            steps={this.props.content.contentFromDatabase}
            subject={this.props.urlName}
          />
          <EditorContainer>
            <TitleLabel>Title:</TitleLabel>
            <TitleInput />
            <Editor
              mode="html"
              theme="solarized_light"
              onChange={this.onChange}
              value={this.state.editorContent}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              width="500px"
              height="200px"
              fontSize={14}
              showGutter={false}
            />
          </EditorContainer>
          <NewPageButton>Add New Page</NewPageButton>
          <DeletePageButton>Delete Page</DeletePageButton>
          <SaveButton>Save</SaveButton>
          <Content>{this.getContent()}</Content>
        </Wrapper>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    content: state.content
  }

}

export default connect(mapStateToProps)(editPage);


