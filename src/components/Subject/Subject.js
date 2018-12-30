import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import queryString from "query-string";
import Sidebar from './Sidebar'
import { setPage, setPageKey, setSubject, setSubjectURL } from '../../state/actions'
import media from './mediaQueries'

const Body = styled.div`
  display: flex;
`
const Content = styled.div`
  margin-top: 10px;
  margin-left: 430px;
  ${media.tablet`margin-left: 50px;`}
  ${media.tablet`margin-left: 10px;`}
  width: 60%;
  ${media.tablet`width: 95%;`}
  padding-bottom: 120px;
`

class Subject extends React.Component {
  componentDidMount() {
    this.props.setSubjectURL(this.props.urlName);
    this.setPage();
 }

  componentDidUpdate() {
    this.props.setPageKey(this.props.children[this.props.page.number].key)
    this.setPage()
  }

  setPage() {
    const query = queryString.parse(this.props.queryParams);
    if (!("pageNumber" in query)) return;
    if (this.props.page.number !== query.pageNumber) {
      this.props.setPage(query.pageNumber);
    }
  }

  render() {
    return (
      <div>
        <Body>
          <Sidebar
            title={this.props.title}
            steps={this.props.children}
            subject={this.props.urlName}
          />
          /
          <Content
            key={this.props.page.subject + this.props.page.number}
            title= "Predeparture"
          >
            {this.props.children[this.props.page.number]}
          </Content>
        </Body>
      </div>
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
  { setPage, setPageKey, setSubject, setSubjectURL }
)(Subject)
