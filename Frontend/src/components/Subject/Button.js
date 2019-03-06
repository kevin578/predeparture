import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { setPage } from '../../state/actions'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { updatePageNumber } from '../../functions'

export const Wrapper = styled.button`
  border: 4px solid #4c6eff;
  background: #4c6eff;
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

  // checkIfCompleted = () => {
  //   if (this.props.completed == null) return false;
  //   if (!(this.props.subjectURL in this.props.completed)) return false;
  //   if (
  //     this.props.completed[this.props.subjectURL].includes(this.props.pageKey)
  //   )
  //     return true;
  //   return false;
  // };

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
    //this.props.resetAnswers();
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
  }
}

export default connect(
  mapStateToProps,
  { setPage }
)(Button)
