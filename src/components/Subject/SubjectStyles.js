import React from "react";
import styled from "styled-components";
import media from "./mediaQueries";

const Wrapper = styled.section`
  min-height: 800px;
  width: 75%;
  ${media.smallLaptop`width: 90%;`}
  ${media.bigPhone`width: 100%;`}
`;

const ImageStyle = styled.img`
  width: ${props => props.width}px;
  ${media.smallLaptop`width: 440px;`}
  ${media.tablet`width: 90%;`}
  marginTop: 20px;
  marginBottom: 20px;
`;

export const Image = props => {
  let width = 622;
  if (props.width) {
    width = props.width;
  }

  return <ImageStyle src={props.src} alt={props.src} width = {width}/>;
};

const VideoStyle = styled.video`
    width: ${props => props.vidWidth}px;
    ${media.smallLaptop`width: 440px;`}
    ${media.tablet`width: 90%;`}


`;

const IFrameStyle = styled.iframe`
    width: ${props => props.vidWidth}px;
`;

export const Video = props => {
  let videoPlayerType = "html5";

  if (props.videoPlayerType == "iframe") videoPlayerType = "iframe";

  let vidWidth = 625;
  if (props.width) vidWidth = props.width;
  const vidHeight = vidWidth / 1.77778;

  if (videoPlayerType == "html5") {
    return (
      <VideoStyle width = {vidWidth} controls>
        <source src={props.src} type="video/mp4" />
      </VideoStyle>
    );
  } else if (videoPlayerType == "iframe") {
    return (
      <IFrameStyle
        width={vidWidth}
        height={vidWidth/1.77777}
        src={props.src}
        title="video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }
};

export const Header = styled.h1`
  font-size: 28px;
  margin-top: 50px;
`;

export const Body = props => {
  return <Wrapper>{props.children}</Wrapper>;
};
