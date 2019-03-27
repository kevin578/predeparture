import React from 'react'
import styled from 'styled-components'
import media from './mediaQueries'

const Wrapper = styled.section`
  min-height: 800px;
  width: 75%;
  ${media.smallLaptop`width: 90%;`}
  ${media.bigPhone`width: 100%;`}
`

const ImageStyle = styled.img`
  width: ${props => props.width}px;
  ${media.smallLaptop`width: 440px;`}
  ${media.tablet`width: 90%;`}
  marginTop: 20px;
  marginbottom: 20px;
`

const parseMediaUrl = (url)=> {
  if(!url || typeof url != 'string') return;
  const urlFragment = url.slice(0, 4);
  if (urlFragment == 'http') {
    return url;
  }
  else {
    return `https://s3.amazonaws.com/clark-predeparture/public/${url}`
  }
}

export const Image = props => {
  let width = 622
  if (props.width) {
    width = props.width
  }
  const url = parseMediaUrl(props.src[0])
  return <ImageStyle src={url} alt={props.src} width={width} />
}

const VideoStyle = styled.video`
  width: ${props => props.vidWidth}px;
  ${media.smallLaptop`width: 440px;`}
  ${media.tablet`width: 90%;`}
`

const IFrameStyle = styled.iframe`
  width: ${props => props.vidWidth}px;
`

export const Video = props => {
  let videoPlayerType = 'html5'

  if (props.videoPlayerType == 'iframe') videoPlayerType = 'iframe'

  let vidWidth = 625
  if (props.width) vidWidth = props.width
  const vidHeight = vidWidth / 1.77778

  if (videoPlayerType == 'html5') {
    return (
      <VideoStyle width={vidWidth} controls>
        <source src={parseMediaUrl(props.src[0])} type="video/mp4" />
      </VideoStyle>
    )
  } else if (videoPlayerType == 'iframe') {
    return (
      <IFrameStyle
        width={vidWidth}
        height={vidWidth / 1.77777}
        src={props.src}
        title="video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    )
  }
}

export const Header = styled.h1`
  font-size: 28px;
  margin-top: 50px;
`

export const Text = styled.p``

export const Link = props => {
  return (
    <a href={props.to} target="_blank">
      {props.children}
    </a>
  )
}

export const Body = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export const List = props => {
  if (!props.children[0]) return <ul></ul>;
  if (props.children[0].type != undefined) return <ul></ul>;
  return (
    <ul>
      {props.children[0].split('--').map((item, index) => {
        return <li key = {`li_${index}`}>{item}</li>
      })}
    </ul>
  )
}
