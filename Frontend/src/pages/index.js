import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import {connect} from "react-redux";
import SiteHeader from '../components/siteHeader'
import Subject from '../components/Subject/Subject'
import Image from '../components/image'
import SEO from '../components/seo'
import { Body, Header, Video } from '../components/Subject/SubjectStyles'
import Button from '../components/Subject/Button';
import renderContent from "../lib/renderContent";




const IndexPage = (props) => {
  const getContent = ()=> {

  return props.content.contentArray.map((item)=> {
      return (
        <Body key = {item.key} title = {item.title}>
        { renderContent(item.content) }
        </Body>
      )
    })
  }
  console.log(getContent())
  //renderContent(props.content.contentArray[props.page.number]
  return (
    <React.Fragment>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <SiteHeader />
    <Subject
      title="Sample Page"
      urlName="sampleURL"
      queryParams={props.location.search}
    >
            {getContent()}
    </Subject>
  </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    content: state.content,
    page: state.page
  }

}

export default connect(mapStateToProps)(IndexPage)
