import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Amplify, { Auth } from 'aws-amplify'
import Modal from 'react-modal'
import SiteHeader from '../components/siteHeader'
import NewUserModal from '../components/newUserModal'

const UserTable = styled.table`
  width: 800px;
  margin-top: 50px;
`
const AddUserButton = styled(Button)`
  && {
    margin-top: 25px;
  }
`
const Container = styled.div`
  padding: 50px;
`

export default class StudentList extends Component {
  state = {
    users: [],
    showModal: false,
    newUserName: '',
    newUserEmail: '',
    newUserRole: '',
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = async () => {
    const users = await axios.get(
      'https://dk1si4n6ka.execute-api.us-east-1.amazonaws.com/dev/getAllUsers'
    )
    this.setState({ users: users.data.Items })
  }

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.email}>
          <td>{user.givenName}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </tr>
      )
    })
  }

  handleChange = event => {
    console.log(event)
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    return (
      <React.Fragment>
        <SiteHeader />
        <Container>
          <UserTable>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              {this.renderUsers()}
            </tbody>
          </UserTable>
          <AddUserButton
            variant="contained"
            color="secondary"
            onClick={this.showModal}
          >
            Add User
          </AddUserButton>
          <NewUserModal
            isOpen={this.state.showModal}
            closeModal={() => this.setState({ showModal: false })}
          />
        </Container>
      </React.Fragment>
    )
  }
}
