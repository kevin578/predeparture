import React from "react";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { connect } from "react-redux";
import { setPageLength } from '../../state/actions'
import media from "./mediaQueries";

const Wrapper = styled.section`
  width: 340px;
  height: 100%;
  background: #EAEBF7;
  position: fixed;
  overflow: auto;
  margin-top: 60px;
  ${media.tablet`display: none;`}
`;

const SidebarSubject = styled.div`
  position: fixed;
  width: 340px;
  height: 60px;
  background: transparent;
  text-align: center;
  border-top: 2px solid #979797;
  border-bottom: 1px solid #979797;
`;

const SidebarSubjectName = styled.p`
  margin-top: 15px;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  right: 20px;
`;

const SidebarItemContainer = styled.div`
  margin-top: 60px;
  padding-bottom: 100px;
`;

const SidebarCourseName = styled.p`
  color: white;
  margin-top: 0px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  right: 20px;
  bottom: 10px;
  font-style: italic;
`;

class Sidebar extends React.Component {
  componentDidMount(){
    this.props.setPageLength(this.props.steps.length);
  }


  // getColor = index => {
  //   const completed = this.props.page.completed;
  //   if (!completed) {
  //     return false;
  //   }

  //   if (!completed[subject]) {
  //     return false;
  //   }

  //   if (completed[subject].includes(index)) {
  //     return true;
  //   }
  // };

  getSidebarItems = () => {
    return this.props.steps.map((step, index) => {
      return (
        <SidebarItem
          key={step.key}
          index={index}
          editor = {this.props.editor}
          // completed={this.getColor(step.key)}
        >
          {/* remove this ternery later */}
          {index + 1}. {step.props ? step.props.title : step.title}
        </SidebarItem>
      );
    });
  };

  // getSubjectNumber() {
  //   if (this.props.subject) return this.props.subject.slice(-1);
  // }

  // getCourseTitle() {
  //   if (!this.props.subject) return;
  //   for (let course of courses) {
  //     if (course.subject == this.props.title) {
  //       const courseArrayIndex = parseInt(this.props.subject.slice(-1));
  //       const title = course.courses[courseArrayIndex - 1];
  //       this.props.setCourseTitle(title);
  //       return title;
  //     }
  //   }
  // }

  render() {
    return (
      <Wrapper>
        <SidebarSubject>
          <SidebarSubjectName>
            {this.props.title}
          </SidebarSubjectName>
          <SidebarCourseName></SidebarCourseName>
        </SidebarSubject>
        <SidebarItemContainer>{this.getSidebarItems()}</SidebarItemContainer>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    // completed: state.completed,
    // subject: state.subjectURL,
    // subjectName: state.subject,
    // achievements: state.achievements,
    // subjectURL: state.subjectURL,
    page: state.page
  };
}

export default connect(
  mapStateToProps,
  {setPageLength}
)(Sidebar);