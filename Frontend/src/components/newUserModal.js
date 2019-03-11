import React, { Component } from 'react'
import axios from 'axios'
import {navigate} from 'gatsby'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Amplify, { Auth } from 'aws-amplify'
import Modal from 'react-modal'
import Select from '@material-ui/core/Select'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const modalStyles = {
  content: {
    width: 380,
    height: 530,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    padding: 25,
  },
  overlay: {
    zIndex: 100,
  },
}

const styles = {
  textField: {
    width: 300,
    marginBottom: 25,
  },
  button: {
    display: 'block',
    marginTop: 40,
  },
}

export default class NewUserModal extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  signUp = () => {
    const { email, password, firstName, lastName } = this.state
    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email,
      },
    })
      .then(data => {
        axios.put(
          'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/addUser',
          {
            id: data.userSub,
            email,
            firstName,
            lastName,
            createdAt: Date.now(),
            role: 'student',
          }
        )
      })
      .catch(err => console.log(err))
      .then(()=> Auth.signIn(this.state.email, this.state.password))
      .then(() => {
        navigate('/');
        const resetModal = () => {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          })
          this.props.closeModal()

        }
        resetModal()
      })
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel="Sign Up"
          ariaHideApp={false}
          onRequestClose={this.props.closeModal}
          style={modalStyles}
        >
          <h4>Sign Up</h4>
          <TextField
            label="Email address"
            value={this.state.email}
            onChange={this.handleChange('email')}
            variant="outlined"
            style={styles.textField}
          />
          <TextField
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            variant="outlined"
            style={styles.textField}
          />
          <TextField
            label="First Name"
            value={this.state.firstName}
            onChange={this.handleChange('firstName')}
            variant="outlined"
            style={styles.textField}
          />
          <TextField
            label="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}
            variant="outlined"
            style={styles.textField}
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={this.signUp}
          >
            Sign up
          </Button>
        </Modal>
      </div>
    )
  }
}
