const jwt = require('jsonwebtoken');

module.exports = (token, type) => {
  let secret;
  if (type === 'ACCESS') {
    secret = process.env.ACCESS_TOKEN_SECRET;
  } else if (type === 'REFRESH') {
    secret = process.env.REFRESH_TOKEN_SECRET;
  } else {
    throw new Error();
  }
  return jwt.verify(token, secret, {
    audience: 'oxyhub-api',
    algorithm: 'HS256'
  });
};
