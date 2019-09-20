import React from "react"
import Container from "../components/container.js"
import indexStyles from "./index.module.css"
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import NavBar from '../components/navbar'
import Img from "gatsby-image"


export default ({ data }) => {

  let logoImg
  let backgroundImg
  let backgroundImg2

  data.allFile.nodes.forEach((node) => {
    if (node.relativePath == 'logoschrift.png') {
      logoImg = node.childImageSharp.fluid
    }
    if (node.relativePath == 'cover.JPG') {
      backgroundImg2 = node.childImageSharp.fluid
    }
    if (node.relativePath == 'group.JPG') {
      backgroundImg = node.childImageSharp.fluid
    }
  })

  return <NavBar>
    <div className={indexStyles.cover}>
      <BackgroundImage style={{
        backgroundAttachment: 'fixed'
      }} fluid={backgroundImg} className={indexStyles.bgimage}>
        <div className={indexStyles.center}>
          <div className={indexStyles.logoContainer}>
            <Img fluid={logoImg}></Img>
          </div>
        </div>
      </BackgroundImage>
    </div>
    <div className={indexStyles.halfcover}>
      <Container>
        <h1>News</h1>
      </Container>
    </div>
    <div className={indexStyles.cover}>
      <BackgroundImage style={{
        backgroundAttachment: 'fixed'
      }} fluid={backgroundImg2} className={indexStyles.bgimage}>

      </BackgroundImage>
    </div>
    <div className={indexStyles.halfcover}>
      <Container>
        <h1>Was ist pfadi?</h1>
      </Container>
    </div>
  </NavBar>
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
  }
`
