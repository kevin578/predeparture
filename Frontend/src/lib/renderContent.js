import React, { Component } from 'react'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import { Body, Header, Video, Image, Link, List } from '../components/Subject/SubjectStyles'
import Text from '../components/Subject/Text';
import Checkbox from '../components/Subject/Checkbox'
import Question from '../components/Subject/Quiz'
import Button from '../components/Subject/Button';




export default function renderContent(html) {
  let editorArray = ReactHtmlParser(html)
  return editorArray.map((item, index) => {
    return editorTypes(item, index)
  })
} 




const editorTypes = (item, index) => {
  if (item == null) return;

  function handleText(text){
    if (!text) return;
    return text.toString().split('\n').map((str, index)=> <Text key = {key + index}>{str}</Text>);
  }

  const key = `${item.type}${index}`
  switch (item.type) {
    case 'header':
      return <Header key={key}>{item.props.children}</Header>
    case 'checkbox':
      return <Checkbox key={key}>{item.props.children}</Checkbox>
    case 'text':
      return handleText(item.props.children[0]);
    case 'video':
      return <Video key={key} src={item.props.children} />
    case 'question':
      return (
        <Question
          key={key}
          correctAnswer={item.props.correctanswer}
          choices={item.props.choices}
        >
          {item.props.children}
        </Question>
      )
    case 'image':
      return <Image key={key} src={item.props.children} width = {item.props.width} />
    case 'button':
        return <Button key = {key}>{item.props.children}</Button>
    case 'links':
        return <Link key = {key} to = {item.props.to}>{item.props.children}</Link>
    case 'list':
        return <List key = {key}>{item.props.children}</List>
    default:
      return
  }
}
