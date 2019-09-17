import React from 'react';
import Container from '../components/container'
import moment from 'moment'
import { graphql } from 'gatsby'
import UeberStufe from '../components/ueber-stufe'

export default ({ data }) => {
  const stufe = data.contentfulStufe
  const anschlag = data.contentfulStufe.anschlag[0]

  function formatTime(time) {
    const timeFormat = 'llll'
    return moment(time).locale('de-DE').format(timeFormat)
  }

  return (
    <Container>
      <UeberStufe stufe={stufe}/>
      <h2>Anschlag</h2>
      <b>Start:</b> {formatTime(anschlag.startzeit)} <br />
      <b>Ende:</b> {formatTime(anschlag.endzeit)}
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
      anschlag {
        mitnehmen {
          json
        }
        infos {
          json
        }
        endzeit
        startzeit
        ort {
          lat
          lon
        }
      }
    }
  }
`