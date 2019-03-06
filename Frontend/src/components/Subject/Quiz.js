import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import {addToRemainingQuestions, removeFromRemaingQuestions} from "../../state/actions";
import {camelize, formAnimation} from "../../functions";





export const TextField = styled.input`
  width: 400px;
  height: 30px;
  font-size: 16px;
  border-width: 0 0 1px 0;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-bottom-color: #4c6eff;
    border-bottom-width: 2px;
  }
`;
const QuestionText = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 5px;
  margin-top: 50px;
`;

const MultipleChoiceConainter = styled.div`
  margin-top: 25px;
`;

const MultipleChoiceLabel = styled.label`
  display: inline-block;
  margin: 0px 0px 10px 20px;
  cursor: pointer;

  &:before {
    /* font-family: Material-Design-Iconic-Font;
    content: "\f26c"; */
    margin-right: 5px;
    text-transform: none;
    position: relative;
    top: 1px;
    right: 5px;
    color: #666;
  }
`;

const RadioButton = styled.input`
  margin-left: 10px;
`;

function parseChoiceString(str) {
  const splitString = str.split(',')
  return splitString.map((item, index)=> {
    if (index == 0) {
      return item
    }
    else {
      return item.slice(1,item.length);
    }
  })
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      prevState: "incorrect"
    };
  }

  componentDidMount() {
    this.props.addToRemainingQuestions();
  }

  componentWillUnmount() {
    if (this.state.prevState == "correct") {
      this.props.removeFromRemaingQuestions();
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });

    if (event.target.value == this.props.correctAnswer) {
      if (this.state.prevState == "correct") return;
      this.props.removeFromRemaingQuestions();
      this.setState({prevState: "correct"});
    } else {
      if (this.state.prevState == "incorrect") return;
      this.props.addToRemainingQuestions();
      this.setState({prevState: "incorrect"});
    }
  };

  getMultipleChoices = () => {
    const choices = parseChoiceString(this.props.choices);
    return (
      <MultipleChoiceConainter>
        
        {choices.map(choice => {
          return (
            <div key={choice}>
              <RadioButton
                id={camelize(choice + this.props.children)}
                type="radio"
                name={camelize(this.props.children)}
                value={choice}
                onChange={this.handleChange}
              />
              <MultipleChoiceLabel htmlFor={camelize(choice + this.props.children)}>
                {choice}
              </MultipleChoiceLabel>
            </div>
          );
        })}
      </MultipleChoiceConainter>
    );
  };

  getQuestionType = () => {
    let { type } = this.props;
    if (this.props.choices) {
      if (this.props.choices.length > 0) type = "mc";
    }

    switch (type) {
      case "text":
        return (
          <div key={this.props.children}>
            <QuestionText>{this.props.children}</QuestionText>
            <TextField
              value={this.state.value}
              onChange={this.handleChange}
              type="text"
            />
          </div>
        );
      case "mc":
        return (
          <div>
            <QuestionText>{this.props.children}</QuestionText>
            {this.getMultipleChoices()}
          </div>
        );
    }
  };

  render() {
    return <div key={this.props.correctAnswer}>{this.getQuestionType()}</div>;
  }
}

Question.defaultProps = {
  type: "text",
  correctAnswer: ""
};

export default connect(
  null,
  {addToRemainingQuestions, removeFromRemaingQuestions}
)(Question);
