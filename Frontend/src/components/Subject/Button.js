import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { setPage, editProgress } from '../../state/actions'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { updatePageNumber } from '../../functions'

export const Wrapper = styled.button`
  border: 4px solid #c00;
  background: #c00;
  box-shadow: 0 2px 4px 0 rgba(168, 168, 168, 0.5);
  border-radius: 10px;
  font-family: Helvetica-Bold;
  font-size: 16px;
  color: #fff;
  width: 100px;
  height: 40px;
  margin-top: 50px;
  margin-bottom: 30px;
  cursor: pointer;
`

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberWrong: 0,
      checkboxMessage: false,
      isValidProjectURL: null,
      isValidProjectTitle: null,
      buttonText: '',
      allTestsPassed: true,
    }
  }

  handleEditProgress = ()=> {
    const itemKey = this.props.content.contentArray[this.props.page.number].key;
    let {progress, role} = this.props.user;
    progress.push(itemKey);
    this.props.editProgress(progress);
    if (role == "student") {
      axios.put("https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/editProgress", {progress});
    }
  }

  checkForNextPage = () => {
    const displayCheckboxError = () => {
      this.setState({
        checkboxMessage: this.props.page.remainingCheckboxes > 0,
      })
    }

    const displayQuestionError = () => {
      console.log()
      this.setState({ numberWrong: this.props.page.remainingQuestions })
    }

    displayCheckboxError()
    displayQuestionError()

    if (
      this.props.page.remainingQuestions === 0 &&
      this.props.page.remainingCheckboxes === 0
    ) {
      this.nextPage()
    }
  }


  nextPage = () => {
    this.handleEditProgress();
    if (
      parseInt(this.props.page.number, 10) + 1 ==
      this.props.content.contentArray
    ) {
      navigate('/')
      this.props.setPage(0)
    } else {
      const newPageNumber = parseInt(this.props.page.number) + 1
      console.log(newPageNumber)
      updatePageNumber(newPageNumber)
    }
  }

  render() {
    return (
      <div>
        <Wrapper
          onClick={() => {
            this.checkForNextPage()
          }}
        >
          {this.props.children}
        </Wrapper>
        {this.state.numberWrong > 0 && (
          <p>You still have {this.state.numberWrong} wrong.</p>
        )}
        {this.state.checkboxMessage && (
          <p>You have not completed all the requirements.</p>
        )}
      </div>
    )
  }
}

Button.defaultProps = {
  changeScoreValue: 5,
  testButtonText: 'Test',
  children: 'Next',
  type: 'default',
}

function mapStateToProps(state) {
  return {
    page: state.page,
    content: state.content,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { setPage, editProgress }
)(Button)
