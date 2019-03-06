import React, { Component } from 'react'
import axios from 'axios'
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
    height: 430,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
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
    display: "block",
    marginTop: 40
  }
}

export default class NewUserModal extends Component {
  state = {
    name: '',
    email: '',
    role: 'student',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = ()=> {
    const {name, email, role} = this.state;
    this.signUp(name, email, role)
    
    const resetModal = ()=> {
      this.setState({
        name: "",
        email: "",
        role: "student"
      });
      this.props.closeModal();
    }

    resetModal();

  }


  signUp(name, email, role) {

    Auth.signUp({
      username: email,
      password: "clarkies123",
      attributes: {
          email
      },
      validationData: []  //optional
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel="Add User"
          ariaHideApp={false}
          onRequestClose={this.props.closeModal}
          style={modalStyles}
        >
          <h4>Add a new user</h4>
          <TextField
            label="Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            variant="outlined"
            style={styles.textField}
          />
          <TextField
            label="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            variant="outlined"
            style={styles.textField}
          />
          <Select
            native
            value={this.state.role}
            onChange={this.handleChange('role')}
          >
            <option value={'student'}>Student</option>
            <option value={'admin'}>Admin</option>
          </Select>
          <Button
            variant="contained"
            color="primary"
            style = {styles.button}
            onClick = {this.handleSubmit}
          >
            Add User
          </Button>
        </Modal>
      </div>
    )
  }
}
