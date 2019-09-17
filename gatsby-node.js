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
  
}