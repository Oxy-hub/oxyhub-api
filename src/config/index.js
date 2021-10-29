require('dotenv').config();
const setMongoUrl = require('./setMongoUrl');
const setGithubConfig = require('./setGithubConfig');

module.exports = {
  mode: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 8000,
  mongo: setMongoUrl(),
  redis: {
    redisHostName: process.env.REDIS_HOSTNAME,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD
  },
  github: setGithubConfig(),
  tokens: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    expiry: {
      accessToken: process.env.ACCESS_TOKEN_EXPIRY_5M_MS,
      refreshToken: process.env.REFRESH_TOKEN_EXPIRY_3D_MS
    }
  },
  origins: [process.env.LOCAL_ORIGIN, process.env.PROD_ORIGIN],
  apiPrefix: '/api/v0'
};
