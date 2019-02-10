import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";
import SiteHeader from '../components/siteHeader'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Amplify, { Auth } from "aws-amplify";
import { isLoggedIn } from "../state/actions"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "US_EAST_1",
    userPoolId: "us-east-1_8tnRUiOnT",
    identityPoolId: "us-east-1:ce09f285-c38e-4292-a412-1aa11f184343",
    userPoolWebClientId: "4fd480nivo5qc7ssmjv02eqo24",
  }
});

const LoginForm = styled.div`
  position: relative;
  text-align: center;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 300px;
`

const TextInput = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`

const SubmitButton = styled(Button)`
  && {
    display: block;
    margin-left: 90px;
    margin-top: 20px;
    background: #345afb;
  }
`

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  onSubmit = ()=> {
    const {email, password} = this.state;
    const { isLoggedIn}  = this.props;
    Auth.signIn(email, password).then((resp)=> {
        isLoggedIn(true);
    }).catch((err)=> {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <SiteHeader />
        <LoginForm>
          <TextInput
            id="outlined-name"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            variant="outlined"
          />
          <TextInput
            id="outlined-name"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            variant="outlined"
          />
          <SubmitButton
            variant="contained"
            color="primary"
            onClick = {this.onSubmit}
          >
            Login
          </SubmitButton>
        </LoginForm>
      </div>
    )
  }
}

export default connect(null, {isLoggedIn})(Login)


