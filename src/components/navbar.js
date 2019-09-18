import React, { useState } from "react"
import navbarStyles from "./navbar.module.css"
import { Link, graphql, StaticQuery } from "gatsby"
import Dropdown from "../components/dropdown"
import Img from "gatsby-image"

export default ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
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
          <div className={navbarStyles.navMain}>
          <div className={navbarStyles.leftContainer}>
                <Link to="/">
                  <div
                    style={
                      hasScrolled
                        ? {
                            height: 20,
                            width: 20,
                          }
                        : {
                            height: 40,
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
                <Dropdown title="Stufen">
                  <Link to="/stufen/pfader">Pfadi</Link>
                </Dropdown>
              </div>
          </div>
          {children}
        </div>
      )}
    />
  )
}
