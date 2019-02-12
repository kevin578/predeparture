import { Link } from 'gatsby'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Amplify, { Auth } from "aws-amplify";
import { setLoginState } from "../state/actions";



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
const HeaderLink = styled.a`
  cursor: pointer;
`

class SiteHeader extends Component {

  componentDidMount() {
    this.getAuthState();
  }

  getAuthState = async ()=> {
    await Auth.currentAuthenticatedUser();
    this.props.setLoginState(true);
  }

  logout = async ()=> {
    await Auth.signOut();
    this.props.setLoginState(false);
  }

  render() {
    const { isLoggedIn } = this.props.user;
    return (
      <Wrapper>
        <Title>PreDeparture CheckIn</Title>
          {
            isLoggedIn && (
            <Links>
            <HeaderLink>Students</HeaderLink>
            <HeaderLink>Docs</HeaderLink>
            <HeaderLink onClick = {this.logout}>Logout</HeaderLink>
            </Links>
            )
          }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
}) 

export default connect(mapStateToProps, {setLoginState})(SiteHeader)
