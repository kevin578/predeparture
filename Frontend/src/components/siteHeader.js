import { connect } from 'react-redux'
import styled from 'styled-components';
import axios from "axios";
import { Link, navigate } from "gatsby";
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Amplify, { Auth } from "aws-amplify";
import { setLoginState, setContent, setPage } from "../state/actions";
import queryString from "query-string";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'US_EAST_1',
    userPoolId: 'us-east-1_8tnRUiOnT',
    identityPoolId: 'us-east-1:ce09f285-c38e-4292-a412-1aa11f184343',
    userPoolWebClientId: '4fd480nivo5qc7ssmjv02eqo24',
  },
})

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
`

const HeaderItem = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
`

const HeaderLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #fff;
`


class SiteHeader extends Component {

  componentDidMount() {
    this.getAuthState();
    this.getContent();
    this.setPageNumber();
  }

  getAuthState = async ()=> {
    await Auth.currentAuthenticatedUser();
    this.props.setLoginState(true);
  }

  getContent = async ()=> {
    const content = await axios.get("https://s2t7hro01h.execute-api.us-east-1.amazonaws.com/dev/getContent");
    this.props.setContent(content.data); 
  }

  setPageNumber = ()=> {
    const  { pageNumber } = queryString.parse(window.location.search);
    this.props.setPage(pageNumber);

  }
  logout = async ()=> {
    await Auth.signOut();
    this.props.setLoginState(false);
    navigate("/login/");

  }

  render() {
    const { user } = this.props;
    return (
      <Wrapper>
        <Title>PreDeparture CheckIn</Title>
          {
            user.isLoggedIn && (
            <Links>
            <HeaderLink to = "/edit-page/">Editor</HeaderLink>
            <HeaderLink to = "/student-list/">Students</HeaderLink>
            <HeaderItem>Docs</HeaderItem>
            <HeaderItem onClick = {this.logout}>Logout</HeaderItem>
            </Links>
            )
          }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user,
  content: state.content
}) 

export default connect(mapStateToProps, {setLoginState, setContent, setPage })(SiteHeader)
