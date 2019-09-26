import React, { useState } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import photoStyles from "./fotos.module.css"
import { MdClose } from 'react-icons/md'

export default ({ data }) => {
  const [selectedPicture, setSelectedPicture] = useState(null)
  const [loading, setLoading] = useState(true)

  return (
    <Layout>
      <div className={photoStyles.archiveContainer}>
        <Link to='/gallerie'>Zugang zum Passwortgeschützten Fotoarchiv</Link>
      </div>
      <div className={photoStyles.gridContainer}>
        {data.allContentfulGallerieBild.nodes.map(node => {
          return (
            <div
              className={photoStyles.gridItem}
              key={node.bild.file.url}
              onClick={() => {
                setLoading(true)
                setSelectedPicture(node.bild.file.url)
              }}
            >
              <Img style={{ height: "100%" }} fluid={node.bild.fluid}></Img>
            </div>
          )
        })}
      </div>
      {selectedPicture != null && (
        <div className={photoStyles.dim} onClick={() => setSelectedPicture(null)}>
          <MdClose className={photoStyles.closeIcon} size='2em' />
          <div className={photoStyles.pictureContainer}>
            { loading && <div className={photoStyles.loader}>Loading...</div>}
            <img
              style={loading ? { display: "none" } : {}}
              src={`https:${selectedPicture}`}
              onLoad={() => setLoading(false)}
              alt="picture"
            ></img>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulGallerieBild {
      nodes {
        bild {
          fluid {
            ...GatsbyContentfulFluid_tracedSVG
          }
          file {
            url
          }
        }
      }
    }
  }
`
