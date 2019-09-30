import React, { useState } from "react"
import Layout from "../components/layout"
import moment from "moment"
import { graphql } from "gatsby"
import UeberStufe from "../components/ueber-stufe"
import AnschlagMap from "../components/anschlag-map"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import stufeStyles from "./stufe.module.css"
import { MdArrowDropDown } from 'react-icons/md'

export default ({ data }) => {
  const stufe = data.contentfulStufe
  const anschlag = data.contentfulStufe.anschlag[0]
  const [showAnschlag, setShowAnschlag] = useState(false)

  function formatTime(time) {
    const timeFormat = "dd DD.MM.YYYY hh:mm"
    return moment(time)
      .locale("de-DE")
      .format(timeFormat)
  }

  return (
    <Layout>
      <h1>{stufe.name}</h1>
      <div className={stufeStyles.anschlagBox} onClick={() => setShowAnschlag(!showAnschlag)}>
      <div className={stufeStyles.questionContainer}>
        <h2 className={stufeStyles.anschlagTitle}>Anschlag</h2>
        <span><MdArrowDropDown size='1.5em'/></span>
      </div>
        <div className={showAnschlag ? stufeStyles.expanded : stufeStyles.collapsed}>
            <b>Start:</b> {formatTime(anschlag.startzeit)} bei{" "}
            {anschlag.startort} <br />
            <b>Ende:</b> {formatTime(anschlag.endzeit)} bei{" "}
            {anschlag.schlussort}
            <h4>Infos:</h4>
            {documentToReactComponents(anschlag.infos.json)}
          {anschlag.ort != null && (
            <AnschlagMap lat={anschlag.ort.lat} lon={anschlag.ort.lon} />
            )}
        </div>
      </div>
      <UeberStufe stufe={stufe} />
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
