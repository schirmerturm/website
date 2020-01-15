import React, { useEffect, useState } from "react"
import Container from "./container"
import NavBar from "./navbar"
import layoutStyles from "./layout.module.css"
import BackgroundImage from "gatsby-background-image"
import { StaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default ({ children }) => {
  const [backgroundFile, setBackgroundFile] = useState("pano")

  // Set header background image dynamically
  useEffect(() => {
    function handleResize() {
      const m = window.matchMedia("only screen and (max-width: 800px)")
      if (m.matches) {
        setBackgroundFile("snow")
      } else {
        setBackgroundFile("pano")
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <StaticQuery
      query={graphql`
        {
          pano: file(relativePath: { eq: "pano.jpeg" }) {
            childImageSharp {
              fluid(quality: 60) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          snow: file(relativePath: { eq: "snow.jpeg" }) {
            childImageSharp {
              fluid(quality: 60) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      `}
      render={data => (
        <NavBar>
          <Helmet>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
            <title>Schirmerturm</title>
          </Helmet>
          <div className={layoutStyles.headerImage}>
            <BackgroundImage fluid={data[backgroundFile].childImageSharp.fluid}>
              <div className={layoutStyles.fillBackground}></div>
            </BackgroundImage>
          </div>
          <Container>{children}</Container>
        </NavBar>
      )}
    />
  )
}
