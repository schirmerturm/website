import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Expandable from '../components/expandable'
import { Helmet } from 'react-helmet'

export default ({ data }) => {
  return <Layout>
    <Helmet>
      <title>FAQs - Schirmerturm</title>
    </Helmet>
    <h1>FAQs</h1>
    <h3 className='subTitle'>Hier findest du eine Sammlung häufig gestellter Fragen</h3>
    {
      data.allContentfulFaqFrage.nodes.map((node) => (
        <Expandable title={node.frage.frage} body={node.antwort.json}/>
      ))
    }
  </Layout>
}

export const query = graphql`{
    allContentfulFaqFrage {
      nodes {
        frage {
          frage
        }
        antwort {
          json
        }
      }
    }
  }`
