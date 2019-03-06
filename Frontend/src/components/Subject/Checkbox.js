import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { camelize, formAnimation } from '../../functions'
import { addCheckbox, removeCheckbox } from '../../state/actions'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaterialCheckbox from '@material-ui/core/Checkbox'


const Container = styled.div`
  margin-bottom: 7px;
`

class Checkbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      completed: false,
    }
  }

  componentDidMount() {
    this.props.addCheckbox()
  }

  componentWillUnmount() {
    if (!this.state.completed) {
      this.props.removeCheckbox();
    }
  }

  handleInputChange = event => {
    const { checked } = event.target
    checked ? this.props.removeCheckbox() : this.props.addCheckbox()
    this.setState({
      completed: checked,
    })
  }

  render() {
    return (
      <Container>
        <FormControlLabel
          control={
            <MaterialCheckbox
              checked={this.state.completed}
              onChange={this.handleInputChange}
              color="primary"
            />
          }
          label={this.props.children}
        />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.page,
  }
}

export default connect(
  mapStateToProps,
  { addCheckbox, removeCheckbox }
)(Checkbox)
