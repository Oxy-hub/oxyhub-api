const jwt = require('jsonwebtoken');
exports.generateAccessToken = payload => {
  const accessToken = jwt.sign(payload, 'secret', {
    expiresIn: '1d',
    audience: 'oxyhub-api',
    algorithm: 'HS256',
  });
  return accessToken;
};

exports.generateRefreshToken = payload => {
  const refreshToken = jwt.sign(payload, 'secret', {
    expiresIn: '7d',
    audience: 'oxyhub-api',
    algorithm: 'HS256',
  });

  return refreshToken;
};
