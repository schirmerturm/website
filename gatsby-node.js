const path = require('path')

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type == "ContentfulStufe") {
    const slug = `/stufen/${node.name.toLowerCase()}`
    const { createNodeField } = actions
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
  query {
    allContentfulStufe {
      nodes {
        fields {
          slug
        }
        anschlag {
          id
        }
      }
    }
    allContentfulSeite {
      nodes {
        titel
        route
        inhalt {
          json
        }
      }
    }
  }
  `)
  result.data.allContentfulStufe.nodes.forEach((node) => {
    if (node.anschlag == null) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/stufe-ohne-anschlag.js`),
        context: {
          slug: node.fields.slug
        }
      })
    } else {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/stufe-mit-anschlag.js`),
        context: {
          slug: node.fields.slug
        }
      })
    }
  });

  result.data.allContentfulSeite.nodes.forEach((node) => {
    createPage({
      path: node.route,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        route: node.route
      }
    })
  })

}
