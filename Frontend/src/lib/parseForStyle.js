import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { camelize } from '../functions'
var short = require('short-uuid')

const StyledSpan = styled.span`
  font-weight: ${props => props.bold ? 600 : 400};
  font-style: ${props => props.italics ? 'italic' : 'normal'};
  text-decoration: ${props => props.underline ? 'underline' : 'none '};
`

const isEven = num => {
    return num % 2 === 0
  }

export const parseForStyle = str => {

    const currentlyActiveStyles = []
    //if (typeof str === 'string') return str;
    //function that checks if a letter is in the currently active array
    
    const styleIsActive = (style) => {
      return currentlyActiveStyles.includes(style)
    }

    const changeCurrentlyActiveStyles = (tag)=> {
      if (!(tag)) {
        return false
      }
      for (let i = 0; i < tag.length; i++) {
        if (tag[i] === '#') {
          continue
      }

        const styleIsActive = currentlyActiveStyles.includes(tag[i])
        if (styleIsActive) {
          const styleIndex = currentlyActiveStyles.indexOf(tag[i])
          currentlyActiveStyles.splice(styleIndex, 1)
        } else {
          currentlyActiveStyles.push(tag[i])
        }
      }
    }

    /*returns an array of React Components. They are all spans with different props passed to them. 
    The regExContainsLetters function returns true or false based on if the letter is contained within
    the current index of the styleTags array. */

    return str.split(/#[BIU]+#/).map((item, index) => {
      //Array that has all of the style tags from the orginal string
      const styleTagsArray = str.match(/#[BIU]+#/g)
      const span =  (
        <StyledSpan
          key={short.uuid()}
            underline={styleIsActive('U')}
            italics={styleIsActive('I')}
            bold={styleIsActive('B')}
        >
          {item}
        </StyledSpan>
      )
      if (styleTagsArray != null) {
        changeCurrentlyActiveStyles(styleTagsArray[index]);
      }

      return span;
    })
  }