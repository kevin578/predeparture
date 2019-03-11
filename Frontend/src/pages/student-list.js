import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Amplify, { Auth } from 'aws-amplify'
import Modal from 'react-modal'
import SiteHeader from '../components/siteHeader'
import AuthCheck from '../components/AuthCheck'
import Select from '@material-ui/core/Select'
import LoadUserInfo from '../components/LoadUserInfo'

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

class StudentList extends Component {
  state = {
    users: [],
    showModal: false,
    newUserName: '',
    newUserEmail: '',
    newUserRole: '',
    role: '',
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = async () => {
    const users = await axios.get(
      'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/getAllUsers'
    )
    this.setState({ users: users.data.Items })
  }

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.email}>
          <td>{`${user.firstName} ${user.lastName}`}</td>
          <td>{user.email}</td>
          <td>{this.getProgress(user.role)}</td>
          <td>
            <Select
              native
              value={user.role}
              // onChange={this.handleRoleChange('role')}
            >
              <option value={'student'}>Student</option>
              <option value={'admin'}>Admin</option>
            </Select>
          </td>
        </tr>
      )
    })
  }

  getProgress = (role)=> {
    if (role == 'admin') {
      return "*"
    }
    return "0%"
  }

  handleRoleChange = event => {
    this.setState({
      role: "student",
    })
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    return (
      <AuthCheck authRedirect="/login" roleRedirect="/" role="admin">
        <SiteHeader />
        <Container>
          <UserTable>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Progress</th>
                <th>Role</th>
              </tr>
              {this.renderUsers()}
            </tbody>
          </UserTable>
        </Container>
      </AuthCheck>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps)(StudentList)
