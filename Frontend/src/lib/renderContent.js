import React, { Component } from 'react'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser'
import { Body, Header, Video, Text, Image } from '../components/Subject/SubjectStyles'
import Checkbox from '../components/Subject/Checkbox'
import Question from '../components/Subject/Quiz'

export default function renderContent(html) {
  let editorArray = ReactHtmlParser(html)
  return editorArray.map((item, index) => {
    return editorTypes(item, index)
  })
}

const editorTypes = (item, index) => {
  const key = `${item.type}${index}`
  switch (item.type) {
    case 'header':
      return <Header key={key}>{item.props.children}</Header>
    case 'checkbox':
      return <Checkbox key={key}>{item.props.children}</Checkbox>
    case 'text':
      return <Text key={key}>{item.props.children}</Text>
    case 'video':
      return <Video key={key} src={item.props.src} />
    case 'question':
      return (
        <Question
          key={key}
          correctAnswer={item.props.correctAnswer}
          choices={item.props.correctAnswer}
        >
          {item.props.children}
        </Question>
      )
    case 'image':
      return <Image key={key} src={item.props.src} width = {item.props.width} />
    default:
      return
  }
}
