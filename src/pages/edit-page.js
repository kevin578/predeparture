import React from 'react'
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'
import { Body, Header, Video, Text } from "../components/Subject/SubjectStyles";
import Checkbox from "../components/Subject/Checkbox";
import { Parser } from "html-to-react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import 'brace/mode/html'
import 'brace/theme/solarized_light';


const header = Header;

const EditorContainer = styled.div`
    margin-top: 20px;
    height: 200px;
    display: flex;
`

const editorTypes = (item)=> {
    console.log(item.type)
    switch(item.type) {
        case "header":
            return <Header>{item.props.children}</Header>
        case "checkbox":
            return <Checkbox>{item.props.children}</Checkbox>
        case "text":
            return <Text>{item.props.children}</Text>
        default: 
            return 
    }
}

const Content = styled.div`
margin-left: 50px;
`

export default class editPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
        editorContent: ""
    }
  }

  onChange = (newValue)=> {
    this.setState({editorContent: newValue})
  }

  getContent = ()=> {
    const html = this.state.editorContent;
    let editorArray = ReactHtmlParser(html);

    return editorArray.map((item)=> {
        return editorTypes(item);
    })
    

    
    
  }

  
  render() {
    return (
        <EditorContainer>
        <AceEditor
          mode="html"
          theme="solarized_light"
          onChange={this.onChange}
          value = {this.state.editorContent}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          width="500px"
          height="200px"
          fontSize={14}
          showGutter={false}

        />
        
        <Content>
        { this.getContent() }
        </Content>
        </EditorContainer>
    )
  }
}
