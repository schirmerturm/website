import React from "react"
import Container from "../components/container.js"
import indexStyles from "./index.module.css"
import { graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import NavBar from "../components/navbar"
import Img from "gatsby-image"
import moment from "moment"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FiChevronsDown } from "react-icons/fi"
import { Helmet } from "react-helmet"

export default ({ data }) => {
  let logoImg
  let backgroundImg
  let backgroundImg2

  data.allFile.nodes.forEach(node => {
    if (node.relativePath == "logoschrift.png") {
      logoImg = node.childImageSharp.fluid
    }
    if (node.relativePath == "cover.JPG") {
      backgroundImg2 = node.childImageSharp.fluid
    }
    if (node.relativePath == "group.JPG") {
      backgroundImg = node.childImageSharp.fluid
    }
  })

  function scrollDown() {
    window.scroll({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <NavBar>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Pfadi Schirmerturm</title>
      </Helmet>
      <div className={indexStyles.cover}>
        <BackgroundImage
          style={{
            backgroundAttachment: "fixed",
          }}
          fluid={backgroundImg}
          className={indexStyles.bgimage}
        >
          <div className={indexStyles.center}>
            <div className={indexStyles.logoContainer}>
              <Img fluid={logoImg}></Img>
            </div>
          </div>
          <FiChevronsDown
            className={indexStyles.scrollArrow}
            size="6em"
            onClick={scrollDown}
          />
        </BackgroundImage>
      </div>
      <div className={indexStyles.mobileCover}>
        <BackgroundImage
          fluid={backgroundImg}
          className={indexStyles.bgimage}
        >
          <div className={indexStyles.center}>
            <div className={indexStyles.logoContainer}>
              <Img fluid={logoImg}></Img>
            </div>
          </div>
        </BackgroundImage>
      </div>
      <div className={indexStyles.halfcover}>
        <Container>
          <div className={indexStyles.titleBar}>
            <h1>News</h1>
            <span className={indexStyles.more}>
              <Link to="/news">Mehr news</Link>
            </span>
          </div>
          <div className={indexStyles.newsPreviewContainer}>
            {data.allContentfulNewspost.nodes.map(node => (
              <div className={indexStyles.newsPreview}>
                <Link to={node.fields.slug}>
                  <h3>{node.titel}</h3>
                  <span className={indexStyles.newsDate}>
                    {moment(node.updatedAt).format("DD.MM.YY")}
                  </span>
                  {documentToReactComponents(node.inhalt.json)}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className={indexStyles.cover}>
        <BackgroundImage
          style={{
            backgroundAttachment: "fixed",
          }}
          fluid={backgroundImg2}
          className={indexStyles.bgimage}
        ></BackgroundImage>
      </div>
      <div className={indexStyles.mobileCover}>
        <BackgroundImage
          fluid={backgroundImg2}
          className={indexStyles.bgimage}
        >
        </BackgroundImage>
      </div>
      <div className={indexStyles.halfcover}>
        <Container>
          <div className={indexStyles.titleBar}>
            <h1>Was ist Pfadi - wer sind wir?</h1>
            <span className={indexStyles.more}>
              <Link to="/about">Mehr erfahren</Link>
            </span>
          </div>
          <p>
            Die Pfadi ist die grösste Jugendorganisation der Schweiz. Bei den
            wöchentlichen Aktivitäten am Samstag Nachmittag und in den Lagern
            erlebt man bei Spiel, Sport und Spass einzigartige Abenteuer,
            entdeckt die Natur und findet Freunde fürs Leben! Um ein
            Altersgerechtes Programm zu gewährleisten, werden die Kinder
            entsprechend ihrem Alters in 4 verschiedene Stufen unterteilt
            (Biber, 4-6 Jahre; Wölfli, 6-10 Jahre; Pfader 10-15 Jahre; Pios
            15-17 Jahre)
          </p>
          <p>
            Die Abteilung Schirmerturm mit ihrer Biberstufe, der Wolfsstufe
            Kaa-Akela, der Pfadistufe Schrimerturm und ihrer Piostufe hat
            insgesamt ca. 100 Mitglieder aus der ganzen Stadt Luzern und
            Umgebung, die meisten Kinder kommen aus den Quartieren Wesemlin,
            Unterlöchli, Bramberg, St. Karl, Altstadt, wir nehmen aber natürlich
            auch alle, die ausserhalb dieser Gebiete wohnen. Unsere Leiter
            organisieren wöchentlich abwechslungsreiche Aktivitäten in Luzern.
            Egal ob eine Schatzsuche mit Pirat Holzbein im Wald, Verbrecherjagd
            mit den Spezialagenten in der Stadt oder Grittibänzbacken im
            Pfadiheim, langweilig wird es nicht!
          </p>
          <div className={indexStyles.footer}>
            <a
              className={indexStyles.sourceCode}
              href="https://github.com/schirmerturm/website"
            >
              Quellcode
            </a>
          </div>
        </Container>
      </div>
    </NavBar>
  )
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
    allContentfulNewspost(limit: 3) {
      nodes {
        titel
        updatedAt
        inhalt {
          json
        }
        fields {
          slug
        }
      }
    }
  }
`
