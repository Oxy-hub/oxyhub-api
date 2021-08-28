require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  mongo: {
    url: process.env.MONGODB_URL
  },
  redis: {
    redisHostName: process.env.REDIS_HOSTNAME,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  tokens: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    expiry: {
      accessToken: process.env.ACCESS_TOKEN_EXPIRY_5M_MS,
      refreshToken: process.env.REFRESH_TOKEN_EXPIRY_3D_MS
    }
  },
  origins: [process.env.LOCAL_ORIGIN, process.env.PROD_ORIGIN]
};
