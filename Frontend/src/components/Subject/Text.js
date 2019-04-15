import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { camelize } from '../../functions'
var short = require('short-uuid');

const Text = styled.p``

const Bold = styled.span`
  font-weight: 600;
`

const Italics = styled.span`
  font-style: italic;
`

const Underline = styled.span`
  text-decoration: underline;
`

export default props => {
  const [textValue, setTextValue] = useState(props.children)

  const styles = [
    {
      regEx: /#B#/,
      styledComponent: Bold,
    },
    {
      regEx: /#I#/,
      styledComponent: Italics,
    },
    {
      regEx: /#U#/,
      styledComponent: Underline,
    },
  ]

  const loopStyles = () => {
    let componentArray = [];
    let str = props.children;
    for (let style of styles) {
      if (typeof str == 'string') {
        let parsedString = parseForStyle({ ...style, str });
        str = parsedString;
      }
      else {
        for(let i = 0; i < str.length; i++) {
          if(!(str[i].props)) continue;
          let parsedString = parseForStyle({ ...style, str: str[i].props.children });
          if (parsedString.length > 1) {
            str.splice(i,1, ...parsedString);
          }
        }
      }    
    }
    setTextValue(str)
  }

  useEffect(
    () => {
      loopStyles()
    },
    [props.children]
  )

  const isEven = num => {
    return num % 2 === 0
  }

  const parseForStyle = ({ str, regEx, styledComponent }) => {
    return str.split(regEx).map((item, index) => {
      if (isEven(index + 1)) {
        return React.createElement(
          styledComponent,
          {
            key: short.uuid(),
          },
          item
        )
      } else {
        return <React.Fragment key={short.uuid()}>{item}</React.Fragment>
      }
    })
  }

  return <Text>{textValue}</Text>
}
