import React from "react"
import Container from "../components/container.js"
import indexStyles from "./index.module.css"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import NavBar from "../components/navbar"
import Img from "gatsby-image"
import moment from "moment"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default ({ data }) => {
  let logoImg
  let backgroundImg
  let backgroundImg2

  data.allFile.nodes.forEach(node => {
    if (node.relativePath == "logoschrift.png") {
      logoImg = node.childImageSharp.fluid
    }
    if (node.relativePath == "cover.JPG") {
      backgroundImg2 = node.childImageSharp.fluid
    }
    if (node.relativePath == "group.JPG") {
      backgroundImg = node.childImageSharp.fluid
    }
  })

  return (
    <NavBar>
      <div className={indexStyles.cover}>
        <BackgroundImage
          style={{
            backgroundAttachment: "fixed",
          }}
          fluid={backgroundImg}
          className={indexStyles.bgimage}
        >
          <div className={indexStyles.center}>
            <div className={indexStyles.logoContainer}>
              <Img fluid={logoImg}></Img>
            </div>
          </div>
        </BackgroundImage>
      </div>
      <div className={indexStyles.halfcover}>
        <Container>
          <div className={indexStyles.newsTitleBar}>
            <h1>News</h1>
            <span className={indexStyles.more}><Link to='/news'>Mehr news</Link></span>
          </div>
          <div className={indexStyles.newsPreviewContainer}>
            {data.allContentfulNewspost.nodes.map(node => (
              <div className={indexStyles.newsPreview}>
                <Link to={node.fields.slug}>
                  <h3>{node.titel}</h3>
                  <span className={indexStyles.newsDate}>
                    {moment(node.updatedAt).format("DD.MM.YY")}
                  </span>
                  {documentToReactComponents(node.inhalt.json)}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className={indexStyles.cover}>
        <BackgroundImage
          style={{
            backgroundAttachment: "fixed",
          }}
          fluid={backgroundImg2}
          className={indexStyles.bgimage}
        ></BackgroundImage>
      </div>
      <div className={indexStyles.halfcover}>
        <Container>
          <h1>Was ist pfadi?</h1>
        </Container>
      </div>
    </NavBar>
  )
}

export const query = graphql`
  query {
    allFile {
      nodes {
        childImageSharp {
          fluid(quality: 60) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
        relativePath
      }
    }
    allContentfulNewspost(limit: 3) {
      nodes {
        titel
        updatedAt
        inhalt {
          json
        }
        fields {
          slug
        }
      }
    }
  }
`
