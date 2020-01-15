import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import newsStyle from "./news.module.css"
import moment from "moment"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Helmet } from 'react-helmet'

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>News - Schirmerturm</title>
      </Helmet>
      <h1>News</h1>
      <h3 className="subTitle">
        Hier findest du die letzten News unserer Abteilung
      </h3>
      {data.allContentfulNewspost.nodes.map(node => (
        <Link to={node.fields.slug}>
          <div className={newsStyle.post}>
            <div className={newsStyle.titleBar}>
              <h3>{node.titel}</h3>
              <span className={newsStyle.date}>
                {moment(node.updatedAt).format("DD.MM.YY")}
              </span>
            </div>
            {documentToReactComponents(node.inhalt.json)}
          </div>
        </Link>
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulNewspost {
      nodes {
        titel
        inhalt {
          json
        }
        updatedAt
        fields {
          slug
        }
      }
    }
  }
`
