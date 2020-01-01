import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Expandable from '../components/expandable'

export default ({ data }) => {
  return <Layout>
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
