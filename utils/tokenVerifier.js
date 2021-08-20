const jwt = require('jsonwebtoken');
module.exports = (token, type) => {
  let secret;
  switch (type) {
    case 'ACCESS':
      secret = process.env.ACCESS_TOKEN_SECRET;
    case 'REFRESH':
      secret = process.env.REFRESH_TOKEN_SECRET;
  }
  return jwt.verify(token, 'secret', {
    audience: 'oxyhub-api',
    algorithm: 'HS256'
  });
};
