const jwt = require('jsonwebtoken');

exports.generateTokens = (req, res, next) => {
  const payload = { message: 'Id token verified' };

  //Access token generation using jsonwebtoken
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 120 });

  //Refresh token generation using jsonwebtoken
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  //Sending back HTTPonly cookie in response object
  res.cookie('ATK', accessToken, { httpOnly: true });
  res.cookie('RTK', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.sendStatus(200);

  next();
};
