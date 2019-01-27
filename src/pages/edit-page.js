import React from 'react'
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

const header = Header

const Wrapper = styled.div`
margin-top: -1px;
  display: grid;
  grid-template-columns: 400px 525px auto;
  grid-template-rows: 70px 60px 400px 400px;
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
  margin-top: 20px;
  height: 200px;
  grid-column-start: 2;
`

const Button = styled.div`
  width: 120px;
  height: 40px;
`

const NewPageButton = styled(Button)`
background: #504DB7;
  grid-column-start: 3;
  grid-row-start: 2;
`
const DeletePageButton = styled(Button)`
    background: #D37E7E;
    grid-column-start: 3;
    grid-row-start: 3;
`

const Content = styled.div``

const editorTypes = item => {
  console.log(item.type)
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

export default class editPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: '',
    }
  }

  onChange = newValue => {
    this.setState({ editorContent: newValue })
  }

  getContent = () => {
    const html = this.state.editorContent
    let editorArray = ReactHtmlParser(html)

    return editorArray.map(item => {
      return editorTypes(item)
    })
  }

  render() {
    return (
      <React.Fragment>
        <SiteHeader />
        <Wrapper>
          <Sidebar
            title="Tasks"
            steps={dummyArray}
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
          <NewPageButton />
          <DeletePageButton />
          <Content>{this.getContent()}</Content>
        </Wrapper>
      </React.Fragment>
    )
  }
}
