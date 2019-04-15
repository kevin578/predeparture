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
import { relative } from 'path'
import { defaultContent } from '../lib/defaultGuideString'
import SiteHeader from '../components/siteHeader'
import AuthCheck from '../components/AuthCheck'
import LoadUserInfo from '../components/LoadUserInfo'
import marked from 'marked';
import hljs from 'highlightjs';
import axios from 'axios';


const Page = styled.div`
  display: flex;
`

const EditorContainer = styled.div``

const ContentContainer = styled.div`
  margin-top: 90px;
  margin-left: 120px;
  padding: 10px;
`

const Content = styled.div`
  position: relative;
  bottom: 50px;
`

export default class GuideEditor extends Component {
  state = {
    markdown: '# header',
  }

  componentDidMount() {
    this.loadReadMe();
  }


  loadReadMe = ()=> {
   axios.get('https://raw.githubusercontent.com/kevin578/predeparture/master/Frontend/README.md').
   then((resp)=> {
    this.setState({markdown: resp.data})
   })
   .catch((err)=> {
     console.log(err);
   })
  }

  getMarkdown = ()=> {
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
    return { __html: marked(this.state.markdown) };
  }

  render() {
    return (
      <LoadUserInfo>
      <AuthCheck authRedirect="/login" roleRedirect="/" role="admin">
        <Page>
          <SiteHeader />
          <ContentContainer>
          <div dangerouslySetInnerHTML={this.getMarkdown()}/>
          </ContentContainer>
        </Page>
      </AuthCheck>
      </LoadUserInfo>
    )
  }
}
