let contentfulConfig

// Check if we can load contentful config from the json file
try {
  contentfulConfig = require('./.contentful') 
} catch(_) {}

// Overwrite with env variables if available
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        ...contentfulConfig,
        downloadLocal: true,
      },
    },
  ],
}
