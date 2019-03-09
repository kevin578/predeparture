import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import SiteHeader from '../components/siteHeader'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button'
import Amplify, { Auth } from 'aws-amplify'
import NewUserModal from '../components/newUserModal'
import { isLoggedIn, setLoginState } from '../state/actions'
import { navigate } from 'gatsby';

const LoginForm = styled.div`
  position: relative;
  text-align: center;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 300px;
`

const SignUpMessage = styled.p`
  font-size: 14px;
  margin-top: 25px;
`

const SignUpLink = styled.a`
  color: #ff775b;
  cursor: pointer;
`

const TextInput = styled(TextField)`
  && {
    margin-bottom: 20px;
    width: 270px;
  }
`
const ErrorMessage = styled(FormHelperText)`
    margin-bottom: 20px;
    width: 270px;
`

const SubmitButton = styled(Button)`
  && {
    display: block;
    margin-left: 65px;
    margin-top: 20px;
    background: #345afb;
  }
`


const Progress = styled(CircularProgress)`
  && {
    display: block;
    position: relative;
    left: 100px;
    top: 10px;
  }
`

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    userErrorMessage: "",
    passwordErrorMessage: "",
    showModal: false
  }

  componentDidMount() {
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleError = err => {
      if (err === "Username cannot be empty") {
        return this.setState({userErrorMessage: "Please enter a username."});
        return;
      }
      switch(err.message) {
        case "User does not exist.":
          return this.setState({userErrorMessage: err.message});
        case "null failed with error Generate callenges lambda cannot be called..":
          return this.setState({passwordErrorMessage: "Please enter a password."});
        case "Incorrect username or password.":
          return this.setState({passwordErrorMessage: "Incorrect password."})
        default:
          return
      }
  }

  onSubmit = () => {
    //const { setState } = this
    const { email, password } = this.state
    const { setLoginState } = this.props
    this.setState({ 
      isLoading: true,
      userErrorMessage: "",
      passwordErrorMessage: ""
    })
    Auth.signIn(email, password)
      .then(resp => {
        setLoginState(true)
        this.setState({ isLoading: false });
        navigate("/edit-page/");
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false });
        this.handleError(err);
      })
  }

  getButton = () => {
    if (this.state.isLoading) {
      return <Progress />
    } else {
      return (
        <SubmitButton
          variant="contained"
          color="primary"
          onClick={this.onSubmit}
        >
          Login
        </SubmitButton>

      )
    }
  }

  render() {
    return (
      <div>
        <SiteHeader />
        <LoginForm>
          <TextInput
            error = {this.state.userErrorMessage ? true:false}
            helperText = {this.state.userErrorMessage}
            id="outlined-name"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            variant="outlined"
          />
          <TextInput
            error = {this.state.passwordErrorMessage ? true:false}
            helperText = {this.state.passwordErrorMessage}
            id="outlined-name"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            variant="outlined"
          />
          { this.getButton() }
          <SignUpMessage>Don't have an account? <SignUpLink onClick = {()=> this.setState({showModal: true})}>Sign up here.</SignUpLink></SignUpMessage>
        </LoginForm>
        <NewUserModal
            isOpen={this.state.showModal}
            closeModal={() => this.setState({ showModal: false })}
          />
      </div>
    )
  }
}

export default connect(
  null,
  { setLoginState }
)(Login)
