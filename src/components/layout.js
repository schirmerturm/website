import React from "react"
import Container from "./container"
import NavBar from "./navbar"
import layoutStyles from "./layout.module.css"
import BackgroundImage from "gatsby-background-image"
import { StaticQuery, graphql } from "gatsby"
import { Helmet } from 'react-helmet'

export default ({ children }) => {
  return (
    <StaticQuery query={graphql`{
      file(relativePath: {eq: "pano.jpeg"}) {
        childImageSharp {
          fluid(quality: 60) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }`}
    render={data => (
      <NavBar>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <title>Schirmerturm</title>
        </Helmet>
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
