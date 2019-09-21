import React from "react"
import Layout from "../components/layout"
import moment from "moment"
import { graphql } from "gatsby"
import UeberStufe from "../components/ueber-stufe"
import AnschlagMap from "../components/anschlag-map"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import stufeStyles from './stufe.module.css'

export default ({ data }) => {
  const stufe = data.contentfulStufe
  const anschlag = data.contentfulStufe.anschlag[0]

  function formatTime(time) {
    const timeFormat = "dd DD.MM.YYYY hh:mm"
    return moment(time)
      .locale("de-DE")
      .format(timeFormat)
  }

  return (
    <Layout>
      <UeberStufe stufe={stufe} />
      <h2>Anschlag</h2>
      <div className={stufeStyles.anschlagBox}>
        <b>Start:</b> {formatTime(anschlag.startzeit)} bei {anschlag.startort}{" "}
        <br />
        <b>Ende:</b> {formatTime(anschlag.endzeit)} bei {anschlag.schlussort}
        <h4>Infos:</h4>
        {documentToReactComponents(anschlag.infos.json)}
      </div>
      {anschlag.ort != null && (
        <AnschlagMap lat={anschlag.ort.lat} lon={anschlag.ort.lon} />
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulStufe(fields: { slug: { eq: $slug } }) {
      name
      beschreibung {
        json
      }
      anschlag {
        infos {
          json
        }
        endzeit
        startzeit
        startort
        schlussort
        ort {
          lat
          lon
        }
      }
    }
  }
`
