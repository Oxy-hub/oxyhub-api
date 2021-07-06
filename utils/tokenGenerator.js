const jwt = require('jsonwebtoken');
exports.generateAccessToken = payload => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 120,
    audience: 'oxyhub-api',
    algorithm: 'HS256',
  });
  return accessToken;
};

exports.generateRefreshToken = payload => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
    audience: 'oxyhub-api',
    algorithm: 'HS256',
  });

  return refreshToken;
};
