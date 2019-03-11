import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/layout'
import { connect } from 'react-redux'
import SiteHeader from '../components/siteHeader'
import Subject from '../components/Subject/Subject'
import Image from '../components/image'
import SEO from '../components/seo'
import { Body, Header, Video } from '../components/Subject/SubjectStyles'
import Button from '../components/Subject/Button'
import renderContent from '../lib/renderContent'
import AuthCheck from '../components/AuthCheck'
import LoadUserInfo from '../components/LoadUserInfo'

const IndexPage = props => {
  const getContent = () => {
    return props.content.contentArray.map(item => {
      return (
        <Body key={item.key} title={item.title}>
          {renderContent(item.content)}
        </Body>
      )
    })
  }
  //renderContent(props.content.contentArray[props.page.number]
  return (
    <AuthCheck authRedirect = "/login">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <SiteHeader />
      <Subject
        title="Tasks"
        urlName="sampleURL"
        queryParams={props.location.search}
      >
        {getContent()}
      </Subject>
    </AuthCheck>
  )
}

function mapStateToProps(state) {
  return {
    content: state.content,
    page: state.page,
    user: state.user,
  }
}

export default connect(mapStateToProps)(IndexPage)
