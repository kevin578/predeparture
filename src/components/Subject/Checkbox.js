import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {camelize, formAnimation} from "../../functions";
import {addCheckbox, removeCheckbox } from "../../state/actions"

const Container = styled.div`
  margin-bottom: 7px;
`;

const CheckboxLabel = styled.label`
  margin: 0px 0px 10px 20px;
  cursor: pointer;
  &:before {
    font-family: Material-Design-Iconic-Font;
    content: "\f279";
    font-size: 18px;
    margin-right: 5px;
    position: relative;
    top: 1px;
    right: 5px;
    color: #666;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
  &:checked + ${CheckboxLabel} {
    &:before {
      display: inline-block;
      content: "\f26a";
      animation: ${formAnimation} 0.3s;
      color: #4c6eff;
    }
  }
`;

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false
    };
  }

  componentDidMount() {
      this.props.addCheckbox();
  }

  componentWillUnmount() {
      this.props.removeCheckbox();
  }

  handleInputChange = event => {
    const { checked } = event.target;
    checked ? this.props.removeCheckbox() : this.props.addCheckbox();
    this.setState({
      completed: checked
    });
  };

  render() {
    return (
      <Container>
        <HiddenCheckbox
          id={camelize(this.props.children)}
          type="checkbox"
          checked={this.state.completed}
          onChange={this.handleInputChange}
        />
        <CheckboxLabel htmlFor={camelize(this.props.children)}>
          {this.props.children}
        </CheckboxLabel>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  };

}

export default connect(
  mapStateToProps,
  { addCheckbox, removeCheckbox } 
)(Checkbox);
