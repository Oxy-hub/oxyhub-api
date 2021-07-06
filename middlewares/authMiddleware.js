const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  try {
    const verified = jwt.verify(req.cookies.ATK, process.env.ACCESS_TOKEN_SECRET, {
      audience: 'oxyhub-api',
      algorithms: ['HS256'],
    });
    req.body.user = verified.payload.message;
    next();
  } catch (err) {
    //error message
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
