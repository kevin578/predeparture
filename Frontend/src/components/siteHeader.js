import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import { Link, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import { setLoginState, setContent, setPage, setUserInfo, editProgress } from '../state/actions'
import queryString from 'query-string'

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
const Title = styled(Link)`
  color: #fff;
  line-height: 60px;
  font-size: 30px;
  margin-left: 60px;
  text-decoration: none;
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
    this.getAuthState()
    this.getContent()
    this.setPageNumber()
  }

  getAuthState = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user.Session == null) return;
    let userInfo = await axios.get(
      'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/getUserById',
      { params: { id: user.username } }
    )
    const { email, firstName, lastName, id, progress, role} = userInfo.data.Item;
    userInfo = {email, firstName, lastName, id, progress, role};
    this.props.setUserInfo(userInfo)
    this.props.editProgress(progress)
    this.props.setLoginState(true);
  }

  getContent = async () => {
    const content = await axios.get(
      'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/getContent'
    )
    this.props.setContent(content.data)
  }

  setPageNumber = () => {
    let { pageNumber } = queryString.parse(window.location.search)
    if (pageNumber == undefined) pageNumber = 0
    this.props.setPage(pageNumber)
  }
  logout = async () => {
    await Auth.signOut()
    this.props.setLoginState(false)
    navigate('/login/')
  }

  render() {
    const { user } = this.props
    return (
      <Wrapper>
        <Title to="/">PreDeparture CheckIn</Title>
        {user.isLoggedIn && (
          <Links>
            <HeaderLink to="/edit-page/">Editor</HeaderLink>
            <HeaderLink to="/student-list/">Students</HeaderLink>
            <HeaderLink to="/guide/">Guide</HeaderLink>
            <HeaderItem onClick={this.logout}>Logout</HeaderItem>
          </Links>
        )}
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
  { setLoginState, setContent, setPage, setUserInfo, editProgress }
)(SiteHeader)
