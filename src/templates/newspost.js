import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import moment from 'moment'
import { Helmet } from 'react-helmet'

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>{data.contentfulNewspost.titel}</title>
      </Helmet>
      <h1>{data.contentfulNewspost.titel}</h1>
      <div style={{
        marginBottom: 20,
        color: 'gray'
      }}>{moment(data.contentfulNewspost.updatedAt).format('DD.MM.YY')}</div>
      {documentToReactComponents(data.contentfulNewspost.inhalt.json)}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulNewspost(fields: {slug: {eq: $slug}}) {
      titel
      inhalt {
        json
      }
      updatedAt
    }
  }
`
