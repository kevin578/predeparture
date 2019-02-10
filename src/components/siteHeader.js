import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  background: #345afb;
  position: fixed;
  z-index: 99;
  display: flex;
  justify-content: space-between;
`
const Title = styled.h1`
color: #fff;
line-height: 60px;
font-size: 30px;
margin-left: 60px;
`

const Links = styled.div`
  display: flex;
  color: #fff;
  justify-content: space-around;
  height: 60px;
  line-height: 60px;
  margin-right: 100px;
  width: 300px;
`;
const HeaderLink = styled.a`

`;

const SiteHeader = ({ siteTitle }) => (
  <Wrapper>
    <Title>{siteTitle}</Title>
    <Links>
        <HeaderLink>Students</HeaderLink>
        <HeaderLink>Docs</HeaderLink>
        <HeaderLink>Logout</HeaderLink>
    </Links>
  </Wrapper>
)

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
}

SiteHeader.defaultProps = {
  siteTitle: `PreDeparture CheckIn`,
}

export default SiteHeader
