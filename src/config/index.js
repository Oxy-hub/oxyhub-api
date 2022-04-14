const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)
});

module.exports = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  mongo: {
    url: process.env.MONGODB_URL
  },
  redis: {
    hostName: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI
  },
  tokens: {
    secrets: {
      accessToken: process.env.ACCESS_TOKEN_SECRET,
      refreshToken: process.env.REFRESH_TOKEN_SECRET
    },
    expiry: {
      accessToken: process.env.ACCESS_TOKEN_EXPIRY_5M_MS,
      refreshToken: process.env.REFRESH_TOKEN_EXPIRY_3D_MS
    }
  },
  origin: process.env.FRONTEND_ORIGIN,
  apiPrefix: process.env.API_PREFIX,
  apiBaseUrl: process.env.API_BASE_URL
};
