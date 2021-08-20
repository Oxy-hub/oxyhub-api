const jwt = require('jsonwebtoken');

exports.generateAccessToken = payload => {
  const accessToken = jwt.sign(payload, 'secret', {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY_5M_MS,
    audience: 'oxyhub-api',
    algorithm: 'HS256'
  });
  return accessToken;
};

exports.generateRefreshToken = payload => {
  const refreshToken = jwt.sign(payload, 'secret', {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY_3D_MS,
    audience: 'oxyhub-api',
    algorithm: 'HS256'
  });

  return refreshToken;
};
