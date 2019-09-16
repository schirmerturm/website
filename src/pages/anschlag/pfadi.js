import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Container from "../../components/container.js"
import moment from 'moment';

export default ({ data }) => {
  const anschlag = data.allContentfulAnschlag.edges[0].node
  return (<Container>
    <h1>Anschlag</h1>
    <p>Die aktivität dauert von {moment(anschlag.startzeit).locale('de').format('llll').toString()} bis {moment(anschlag.endzeit).locale('de').format('llll').toString()}</p>
    <h3>Infos:</h3>
    {documentToReactComponents(anschlag.infos.json)}
    <h3>Mitnehmen:</h3>
    {documentToReactComponents(anschlag.mitnehmen.json)}
  </Container>)
}

export const query = graphql`
query {
  allContentfulAnschlag(filter: {titel: {eq: "Pfadistufe"}}) {
    edges {
      node {
        infos {
          json
        }
        mitnehmen {
          json
        }
        ort {
          lat
          lon
        }
        startzeit
        endzeit
      }
    }
  }
}`
