import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { resetAnswers } from '../../state/actions'
import { updatePageNumber } from '../../functions'
import checkmark from '../../images/check.png'

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #979797;
  cursor: pointer;
  background: ${props => props.backgroundColor};
  transition: 0.5s all;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
`

const ItemName = styled.p`
  margin-left: 15px;
  margin-right: 10px;
  width: 100%;
  font-size: 14px;
`

const Check = styled.img`
width: 20px;
position: relative;
top: 10px;
right: 15px;

`

class SidebarItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      completed: false,
    }
  }

  click = () => {
    updatePageNumber(this.props.index)
  }

  checkIfCompleted = () => {
    const itemKey = this.props.content.contentArray[this.props.index].key;
    if (!itemKey) return;
    let {progress} = this.props.user;
    if (progress.includes(itemKey)) {
      return true;
    }
    else {
      return false;
    }
  };

  getColor = () => {
    const currentlySelected = this.props.index == this.props.page.number
    const completed = this.checkIfCompleted();
    if (currentlySelected) {
      return '#f7f7f7' //light grey
    } 
     else {
      return 'transparent'
    }
  }

  render() {
    return (
      <Wrapper
        onClick={this.click}
        completed={this.checkIfCompleted()}
        backgroundColor={() => this.getColor()}
      >
        <ItemName>{this.props.children}</ItemName>
        {this.checkIfCompleted() && <Check src = {checkmark}/>}
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.page,
    user: state.user,
    content: state.content
  }
}

export default connect(
  mapStateToProps,
  { resetAnswers }
)(SidebarItem)
