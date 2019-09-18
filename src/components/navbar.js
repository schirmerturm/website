import React, { useState, useEffect } from "react"
import navbarStyles from "./navbar.module.css"
import { Link, graphql, StaticQuery } from "gatsby"
import Dropdown from "../components/dropdown"
import Img from "gatsby-image"

export default ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "logo.png" }) {
            childImageSharp {
              fluid(maxHeight: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          <div className={navbarStyles.navMain} style={
            hasScrolled ? {} : {
              background: 'none'
            }
          }>
          <div className={navbarStyles.leftContainer}>
                <Link to="/">
                  <div
                    style={
                      hasScrolled
                        ? {
                            height: 30,
                            width: 15,
                          }
                        : {
                            height: 80,
                            width: 40,
                          }
                    }
                    className={navbarStyles.logo}
                  >
                    <Img fluid={data.file.childImageSharp.fluid} />
                  </div>
                </Link>
              </div>
              <div className={navbarStyles.rightContainer}>
                <Link to='/about'>Über Pfadi</Link>
                <Dropdown title="Stufen">
                  <Link to="/stufen/biber">Biber</Link>
                  <Link to="/stufen/wölfe">Wölfe</Link>
                  <Link to="/stufen/pfader">Pfadi</Link>
                  <Link to="/stufen/pios">Pios</Link>
                </Dropdown>
                <Link to='/FAQ'>FAQs</Link>
              </div>
          </div>
          {children}
        </div>
      )}
    />
  )
}
