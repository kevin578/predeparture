import React, { Component } from 'react'
import styled from 'styled-components'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import 'brace/mode/html'
import 'brace/theme/solarized_light'
import AceEditor from 'react-ace'
import renderContent from '../lib/renderContent'
import { relative } from 'path';
import { defaultContent } from "../lib/defaultGuideString"
import SiteHeader from "../components/siteHeader"

const Page = styled.div`
  display: flex;
`

const EditorContainer = styled.div`
`

const ContentContainer = styled.div`
  margin-top: 90px;  
  margin-left: 120px;
  height: 1000px;
  width: 500px;
  padding: 10px;
`

const Content = styled.div`
  position: relative;
  bottom: 50px;
`

export default class GuideEditor extends Component {
  state = {
    editorContent: ''
  }

  componentDidMount() {
    this.setDefaultContent()
  }

  setDefaultContent() {
    this.setState({editorContent: defaultContent});
  }

  onEditorChange = newValue => {
    console.log(newValue)
    this.setState({ editorContent: newValue })
  }

  render() {
    return (

      <Page>
        <SiteHeader />
        <EditorContainer>
          { typeof window !== 'undefined' && <AceEditor
            mode="html"
            theme="solarized_light"
            onChange={this.onEditorChange}
            value={this.state.editorContent}
            name="editor"
            editorProps={{ $blockScrolling: true }}
            width="500px"
            height="1200px"
            fontSize={14}
            showGutter={false}
            wrapEnabled={true}
            setOptions={{
              indentedSoftWrap: false,
            }}
            style={{
              top: 90,
              left: 40,
            }}
          /> }
        </EditorContainer>
        <ContentContainer>
          <Content>{renderContent(this.state.editorContent)}</Content>
        </ContentContainer>
      </Page>
    )
  }
}
