import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Amplify, { Auth } from 'aws-amplify'
import Modal from 'react-modal'



const customStyles = {
    content: {
      width: 380,
      height: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 150,
      padding: 0,
    },
    overlay: {
      zIndex: 100,
    },
  }


export default class NewUserModal extends Component {
  render() {
    return (
      <div>
                <Modal
          isOpen={this.state.showModal}
          contentLabel="Add User"
          ariaHideApp={false}
          onRequestClose={() => {this.setState({showModal: false})}}
        >
          <TextField
            label="Name"
            value={this.state.newUserName}
            onChange={this.handleChange('name')}
            variant="outlined"
          />
        </Modal>
      </div>
    )
  }
}
