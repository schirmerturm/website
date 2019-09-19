import React from "react"
import Container from "./container"
import NavBar from "./navbar"
import layoutStyles from "./layout.module.css"
import BackgroundImage from "gatsby-background-image"
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => {
  return (
    <StaticQuery query={graphql`{
      file(relativePath: {eq: "pano.jpeg"}) {
        childImageSharp {
          fluid(quality: 60) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }`}
    render={data => (
      <NavBar>
        <div className={layoutStyles.headerImage}>
          <BackgroundImage fluid={data.file.childImageSharp.fluid}>
            <div className={layoutStyles.fillBackground}></div>
          </BackgroundImage>
        </div>
        <Container>{children}</Container>
      </NavBar>
    )}
  />)
}
