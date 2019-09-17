import React from "react"
import Container from "../components/container.js"
import indexStyles from "./index.module.css"
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import NavBar from '../components/navbar'

export default ({ data }) => {
  const imageData = data.file.childImageSharp.fluid

  return <NavBar>
    <div className={indexStyles.cover}>
      <BackgroundImage fluid={imageData} className={indexStyles.bgimage}>
        <Container>
          <h1>Pfadi Schirmerturm</h1>
        </Container>
      </BackgroundImage>
    </div>
  </NavBar>
}

export const query = graphql`
  query {
    file(relativePath: {eq: "cover.JPG"}) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`