const manifestConfig = require('./manifest-config');
require('dotenv').config();

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-manifest',
    options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-plugin-google-fonts',
    options: {
      fonts: ['cabin', 'Open Sans'],
    },
  },
  'gatsby-transformer-remark',
  'gatsby-plugin-offline',
];

module.exports = {
  siteMetadata: {
    isMediumUserDefined: false,
  },
  plugins,
};
