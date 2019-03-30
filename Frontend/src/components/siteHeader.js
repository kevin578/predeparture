import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify'
import { Menu } from '@material-ui/icons';
import {
  setLoginState,
  setContent,
  setPage,
  setUserInfo,
  editProgress,
  clearUserInfo
} from '../state/actions';
import queryString from 'query-string';
import AuthCheck from './AuthCheck';
import media from "./Subject/mediaQueries";
import ReactSVG from "react-svg";
import {getContentHistory} from '../lib/crudFunctions'


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-1',
    userPoolId: 'us-east-1_8tnRUiOnT',
    identityPoolId: 'us-east-1:ce09f285-c38e-4292-a412-1aa11f184343',
    userPoolWebClientId: '4fd480nivo5qc7ssmjv02eqo24',
  },
  Storage: { 
    bucket:'clark-predeparture',
    region: 'us-east-1',
    identityPoolId: 'us-east-1:ce09f285-c38e-4292-a412-1aa11f184343'
   }
})

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  background: #c00;
  position: fixed;
  z-index: 99;
  display: flex;
  justify-content: space-between;
`
const Title = styled(Link)`
  color: #fff;
  line-height: 60px;
  font-size: 30px;
  margin-left: 60px;
  text-decoration: none;
  ${media.tablet` 
    font-size: 18px;
    margin-left: 30px;
  `}
`

const Links = styled.div`
  display: flex;
  color: #fff;
  justify-content: space-around;
  height: 60px;
  line-height: 60px;
  margin-right: 100px;
  width: 300px;
  ${media.tablet` 
    font-size: 14px;
    width: 220px;
    margin-top: 2px;
    margin-right: 50px;
  `}
  ${media.bigPhone`
    display: ${(props)=> props.show ? 'block' : 'none'};
    position: absolute;
    width: 200px;
    height: 242px;
    background: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    top: 60px;
    left: 55%;
  `}
`

const HeaderItem = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  ${media.bigPhone`
    color: black;
    display: block;
    padding-left: 10px;
    border-bottom: 1px black solid;
  `}
`

const HeaderLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  ${media.bigPhone`
    color: black;
    display: block;
    padding-left: 10px;
    border-bottom: 1px black solid;
  `}
`

const Hamburger = styled.div`
  color: white;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 15px;
  display: none;
  ${media.bigPhone`display: block;`}
  ${media.smallPhone`margin-left: 10px;`}
`;


class SiteHeader extends Component {

  state = {
    showHamburger: false
  }

  componentDidMount() {
    this.getContent()
    this.setPageNumber()
  }

  hamburgerClicked = () => {
    this.setState((prevState)=> {
      return {
        showHamburger: !(prevState.showHamburger)
      };
    });
  }

  getContent = async () => {
    const contentArray = await getContentHistory();

    const sortContent = ()=> {
      const items = contentArray.data.Items
      return contentArray.data.Items.sort((a,b)=> {
          return b.time - a.time
      })
    }

    const content = sortContent();
    
    this.props.setContent(content[0].content);
  }

  setPageNumber = () => {
    let { pageNumber } = queryString.parse(window.location.search)
    if (pageNumber == undefined) pageNumber = 0
    this.props.setPage(pageNumber)
  }
  logout = async () => {
    await Auth.signOut()
    this.props.setLoginState(false)
    this.props.clearUserInfo()
    navigate('/login/')
  }

  render() {
    const { user } = this.props
    return (
      <Wrapper>
        <Title to="/">Study Abroad Pre-Departure</Title>
        <Links show = {this.state.showHamburger}>
          <AuthCheck role="admin">
            <HeaderLink to="/edit-page/">Editor</HeaderLink>
            <HeaderLink to="/student-list/">Students</HeaderLink>
            <HeaderLink to="/guide/">Guide</HeaderLink>
          </AuthCheck>
          <AuthCheck>
            <HeaderItem onClick={this.logout}>Logout</HeaderItem>{' '}
          </AuthCheck>
        </Links>
        <Hamburger onClick = {this.hamburgerClicked}>
          <Menu style = {{fontSize: 30}}/>
        </Hamburger>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  content: state.content,
})

export default connect(
  mapStateToProps,
  { setLoginState, setContent, setPage, setUserInfo, editProgress, clearUserInfo }
)(SiteHeader)
