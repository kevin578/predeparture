import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Subject from '../components/Subject/Subject'
import Image from '../components/image'
import SEO from '../components/seo'
import { Body, Header, Video } from '../components/Subject/SubjectStyles'
import Button from '../components/Subject/Button';




const IndexPage = location => (

  

  <React.Fragment>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Subject
      title="Sample Page"
      urlName="sampleURL"
      queryParams={location.location.search}
    >
      {[
        <Body key="starting" title="Start something">
          <Header>Sample Header</Header>
          <p>Some Text</p>
          <Button>Next</Button>
        </Body>,

        <Body key="again" title="Do somthing again">
          <Header>Do something again</Header>
        </Body>,
      ]}
    </Subject>
  </React.Fragment>
)

export default IndexPage
