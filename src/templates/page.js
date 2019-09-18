import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default ({ data }) => {
  return (
    <Layout>
      <h1>{data.contentfulSeite.titel}</h1>
      {documentToReactComponents(data.contentfulSeite.inhalt.json)}
    </Layout>
  )
}

export const query = graphql`
  query($route: String!) {
    contentfulSeite(route: {eq: $route}) {
      titel
      inhalt {
        json
      }
    }
  }
`
