import React, { Component } from 'react'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import { Body, Header, Video, Text, Image, Link } from '../components/Subject/SubjectStyles'
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
  const key = `${item.type}${index}`
  switch (item.type) {
    case 'header':
      return <Header key={key}>{item.props.children}</Header>
    case 'checkbox':
      return <Checkbox key={key}>{item.props.children}</Checkbox>
    case 'text':
      return <Text key={key}>{item.props.children}</Text>
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
    case 'link':
        return <Link key = {key} to = {item.props.to}>{item.props.children}</Link>
    default:
      return
  }
}
