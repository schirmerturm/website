import React from 'react';
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import UeberStufe from '../components/ueber-stufe'

export default ({ data }) => {
  const stufe = data.contentfulStufe
  return (
    <Layout>
      <h1>{stufe.name}</h1>
      <UeberStufe stufe={stufe}/>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulStufe(fields: {slug: {eq: $slug}}) {
      name
      beschreibung {
        json
      }
    }
  }
`
