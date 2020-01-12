import React, { useState } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import photoStyles from "./fotos.module.css"

export default ({ data }) => {
  const [currentRubrik, setCurrentRubrik] = useState(null)

  const rubriken = Array.from(
    new Set(
      data.allContentfulOffentlicheGallerie.edges.map(edge => edge.node.rubrik)
    )
  )

  const rubrikToData = {}
  rubriken.forEach(r => (rubrikToData[r] = []))

  data.allContentfulOffentlicheGallerie.edges.forEach(edge => {
    rubrikToData[edge.node.rubrik].push({
      fluid: edge.node.vorschau.fluid,
      title: edge.node.titel,
      link: edge.node.link,
    })
  })

  return (
    <Layout>
      <div className={photoStyles.archiveContainer}>
        <h1>Fotos</h1>
        <span>
          <Link to="/gallerie">Zugang zum Passwortgeschützten Fotoarchiv</Link>
        </span>
      </div>
      <div className={photoStyles.mainContainer}>
        <div className={photoStyles.sidebar}>
          <h3>Kategorien</h3>
          <ul>
            {rubriken.map(r => (
              <li key={r} onClick={() => setCurrentRubrik(r)}>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className={photoStyles.galleries}>
          {currentRubrik &&
            rubrikToData[currentRubrik].map(d => (
              <div key={d.title} className={photoStyles.gallery}>
                <a href={d.link}>
                  <Img fluid={d.fluid} />
                  <div className={photoStyles.title}>{d.title}</div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulOffentlicheGallerie {
      edges {
        node {
          rubrik
          vorschau {
            fluid {
              src
              sizes
              tracedSVG
              aspectRatio
              base64
              srcSet
              srcSetWebp
              srcWebp
            }
          }
          titel
          link
        }
      }
    }
  }
`
