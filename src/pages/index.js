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
      <BackgroundImage style={{
        backgroundAttachment: 'fixed'

      }} fluid={imageData} className={indexStyles.bgimage}>
        <div className={indexStyles.center}>
          <h1>Pfadi Schirmerturm</h1>
          <h3>Die Stadtpfadi Luzern</h3>
        </div>
      </BackgroundImage>
    </div>
    <div className={indexStyles.halfcover}>
      <Container>
        <h1>News</h1>
      </Container>
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
    file(relativePath: {eq: "cover.JPG"}) {
      childImageSharp {
        fluid(quality: 60) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
