import React, { useState, useEffect } from "react"
import navbarStyles from "./navbar.module.css"
import { Link, graphql, StaticQuery } from "gatsby"
import Dropdown from "../components/dropdown"
import Img from "gatsby-image"

export default ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll)

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll)
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
          <div
            className={navbarStyles.navMain}
            style={
              hasScrolled
                ? {
                    backgroundColor: "white",
                    boxShadow: '0px 7px 14px -4px rgba(99,99,99,0.1)'
                  }
                : {
                    background: "none",
                    boxShadow: 'none'
                  }
            }
          >
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
              <Link className={navbarStyles.underline} to="/about">
                Über Pfadi
              </Link>
              <Dropdown titleClassName={navbarStyles.underline} title="Stufen">
                <Link className={navbarStyles.underline} to="/stufen/biber">
                  Biber
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/wölfe">
                  Wölfe
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/pfadi">
                  Pfadi
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/pio">
                  Pios
                </Link>
              </Dropdown>
              <Link className={navbarStyles.underline} to="/fotos">
                Fotos
              </Link>
              <Link className={navbarStyles.underline} to="/FAQ">
                FAQs
              </Link>
            </div>
          </div>
          {children}
        </div>
      )}
    />
  )
}
