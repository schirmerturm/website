import React, { useState, useEffect } from "react"
import navbarStyles from "./navbar.module.css"
import { Link, graphql, StaticQuery } from "gatsby"
import Dropdown from "../components/dropdown"
import Img from "gatsby-image"
import { MdMenu, MdClose } from "react-icons/md"

export default ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // add scroll listener for navbar shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  // add resize listener to (dis/en)able hamburger menu
  useEffect(() => {
    function handleResize() {
      const m = window.matchMedia("only screen and (max-width: 800px)")
      if (m.matches) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  function triggerMobileMenu() {
    setMenuOpen(!menuOpen)
  }

  const menuStyle = menuOpen
    ? `${navbarStyles.rightContainer} ${navbarStyles.open}`
    : `${navbarStyles.rightContainer} ${navbarStyles.closed}`

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
                    boxShadow: "0px 7px 14px -4px rgba(99,99,99,0.1)",
                  }
                : {
                    background: "none",
                    boxShadow: "none",
                  }
            }
          >
            <div className={navbarStyles.hamburger} onClick={triggerMobileMenu}>
              <MdMenu size={hasScrolled ? "1.6em" : "2em"} />
            </div>
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
            <div className={menuStyle}>
              <div className={navbarStyles.exit} onClick={triggerMobileMenu}>
                <MdClose size="1.6em"/>
              </div>
              <Link className={navbarStyles.underline} to="/about">
                Über Pfadi
              </Link>
              <Dropdown titleClassName={navbarStyles.underline} title="Stufen" disabled={isMobile}>
                <Link className={navbarStyles.underline} to="/stufen/biber">
                  Biber
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/wölfe">
                  Wölfe
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/pfadi">
                  Pfadi
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/pios">
                  Pios
                </Link>
                <Link className={navbarStyles.underline} to="/stufen/abteilung">
                  Abteilung
                </Link>
              </Dropdown>
              <Link className={navbarStyles.underline} to="/fotos">
                Fotos
              </Link>
              <Link className={navbarStyles.underline} to="/kontakt">
                Kontakt
              </Link>
              <Link className={navbarStyles.underline} to="/shop">
                Shop
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
