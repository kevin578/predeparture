import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import {setPage} from "../../state/actions";
import { navigate } from "gatsby";
import { connect } from "react-redux";

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
  margin-bottom: 10px;
  cursor: pointer;
`;

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberWrong: 0,
      checkboxMessage: false,
      isValidProjectURL: null,
      isValidProjectTitle: null,
      buttonText: "",
      allTestsPassed: true
    };
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

  // changeScore saves the new score to the database then animates it for the
  // header

  // changeScore = newScore => {
  //   if (!this.checkIfCompleted()) {
  //     axios.put("/api/setScore", {
  //       score: newScore + this.props.score
  //     });
  //     const timer = () => {
  //       const changeValue = newScore > 0 ? 1 : -1;

  //       for (let i = 0; i < Math.abs(newScore); i++) {
  //         setTimeout(() => {
  //           this.props.changeScore(changeValue);
  //         }, i * 70);
  //       }
  //     };
  //     timer();
  //   }
  // };

  projectSubmissionFormComplete() {
    const { isProjectSubmissionPage } = this.props.projectSubmission;
    if (!this.state.isValidProjectURL && isProjectSubmissionPage) return false;
    if (!this.state.isValidProjectTitle && isProjectSubmissionPage)
      return false;
    return true;
  }

  checkForNextPage = () => {

    // if (Object.keys(this.props.correct).length) {
    //   this.checkQuiz();
    // }
    // this.setState({
    //   checkboxMessage: this.props.remainingCheckboxes > 0
    // });
    // if (
    //   this.checkQuiz() === 0 &&
    //   this.props.remainingCheckboxes === 0 &&
    //   (this.props.testsCompleted === true || this.props.testsCompleted === null)
    // ) {
    //   this.nextPage();
    // }
    this.nextPage();
  };

  nextPage = () => {
    // if (this.props.auth) this.changeScore(this.props.changeScoreValue);
    // this.props.completeButton(this.props.pageKey, this.props.subjectURL);
    // if (this.props.badge) {
    //   this.props.addAchievement(this.props.badge, this.props.subject);
    // }
    
    if (parseInt(this.props.page.number, 10) + 1 == this.props.page.length) {
      navigate("/");
      this.props.setPage(0);
    } else {
      window.location = `/?pageNumber=${parseInt(
        this.props.page.number
      ) + 1}`;
      //this.props.history.push(`${this.props.subjectURL}?pageNumber=${parseInt(this.props.page, 10) + 1}`);
    }
    window.scrollTo(0, 0);
    this.props.resetAnswers();
  };

  checkQuiz = () => {
    let matchArray = [];
    for (let item in this.props.correct) {
      if (this.props.correct[item] == null) {
        matchArray.push(item);
      }
    }
    this.setState({ numberWrong: matchArray.length });
    return matchArray.length;
  };

  // validateURL() {
  //   if (this.state.isValidProjectURL) return;
  //   else if (this.props.projectSubmission.projectURL.length < 8) {
  //     this.setState({ isValidProjectURL: false });
  //   } else {
  //     this.setState({ isValidProjectURL: true }, this.checkForNextPage);
  //   }
  // }

  // validateTitle() {
  //   if (this.state.isValidProjectTitle) return;
  //   else if (this.props.projectSubmission.projectTitle) {
  //     this.setState({ isValidProjectTitle: true }, this.checkForNextPage);
  //   } else {
  //     this.setState({ isValidProjectTitle: false });
  //   }
  // }

  render() {
    return (
      <div>
        <Wrapper
          onClick={() => {
            this.checkForNextPage();
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
        {this.state.isValidProjectURL === false &&
          this.props.projectSubmission.isProjectSubmissionPage && (
            <p>Please enter a valid URL.</p>
          )}
        {this.state.isValidProjectTitle === false &&
          this.props.projectSubmission.isProjectSubmissionPage && (
            <p>Your project does not have a title.</p>
          )}
      </div>
    );
  }
}

Button.defaultProps = {
  changeScoreValue: 5,
  testButtonText: "Test",
  children: "Next",
  type: "default"
};

function mapStateToProps(state) {
  return {
    page: state.page,
  };
}

export default 
  connect(
    mapStateToProps,
    {setPage}
  )(Button);
