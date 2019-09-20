import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import FaqQuestion from '../components/faq-question'

export default ({ data }) => {
  return <Layout>
    <h1>FAQs</h1>
    <h3>Hier findest du eine Sammlung häufig gestellter Fragen</h3>
    {
      data.allContentfulFaqFrage.nodes.map((node) => (
        <FaqQuestion question={node.frage.frage} answer={node.antwort.json}/>
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
