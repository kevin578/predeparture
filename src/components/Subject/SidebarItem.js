import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { navigate } from "gatsby";
import { resetAnswers } from '../../state/actions'

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid ${props =>
    props.completed ? "#D8D8D8" : "#979797"};
  cursor: pointer;
  background: ${props => {
    if (props.currentlySelected && !props.completed) return "#f7f7f7";
    else if (props.currentlySelected) return "#88c47d";
    else if (props.completed) return "#5BA84C";
    else return "transparent";
  }}
  color: ${props => (props.completed ? "#fff" : "default")};
  transition: 0.5s all;
  display: flex;
  justify-content: space-between;
`;

const ItemName = styled.p`
  margin-left: 15px;
  margin-right: 10px;
  width: 100%;
`;

class SidebarItem extends React.Component {


   constructor(props) {
    super(props);

    this.state = {
      completed: false
    };
  }

  click = () => {
    //this.props.resetAnswers();
    navigate(`/?pageNumber=${this.props.index}`);
    window.scrollTo(0, 0);
  };
 

  render() {
    return (
      <Wrapper
        onClick={this.click}
        completed={this.props.completed}
        currentlySelected={(this.props.index == this.props.page)}
      >
        <ItemName>{this.props.children}</ItemName>
      </Wrapper>
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
  { resetAnswers }
)(SidebarItem);
