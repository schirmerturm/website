import React from 'react';
import Container from '../components/container'
import { graphql } from 'gatsby'
import UeberStufe from '../components/ueber-stufe'

export default ({ data }) => {
  const stufe = data.contentfulStufe
  return (
    <Container>
      <UeberStufe stufe={stufe}/>
    </Container>
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