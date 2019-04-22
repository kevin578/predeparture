import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {parseForStyle} from '../../lib/parseForStyle'

const Text = styled.p``

export default props => {
  const [textValue, setTextValue] = useState(props.children)

  useEffect(
    () => {
      setTextValue(parseForStyle(props.children))
    },
    [props.children]
  )

  return <Text>{textValue}</Text>
}

// const styles = [
//   {
//     regEx: /#B#/,
//     styledComponent: Bold,
//   },
//   {
//     regEx: /#I#/,
//     styledComponent: Italics,
//   },
//   {
//     regEx: /#U#/,
//     styledComponent: Underline,
//   },
// ]

// const loopStyles = () => {
//   let componentArray = [];
//   let str = props.children;
//   for (let style of styles) {
//     if (typeof str == 'string') {
//       let parsedString = parseForStyle({ ...style, str });
//       str = parsedString;
//     }
//     else {
//       for(let i = 0; i < str.length; i++) {
//         if(!(str[i].props)) continue;
//         let parsedString = parseForStyle({ ...style, str: str[i].props.children });
//         if (parsedString.length > 1) {
//           str.splice(i,1, ...parsedString);
//         }
//       }
//     }
//   }
//   setTextValue(str)
// }
