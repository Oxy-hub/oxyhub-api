const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenGenerator');
exports.generateTokens = (req, res, next) => {
  const payload = { message: 'Id token verified' };

  //Access token generation using jsonwebtoken
  const accessToken = generateAccessToken(payload);

  //Refresh token generation using jsonwebtoken
  const refreshToken = generateRefreshToken(payload);

  //Sending back HTTPonly cookie in response object
  res.cookie('ATK', accessToken, { httpOnly: true, secure: true });
  res.cookie('RTK', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
  });
  res.sendStatus(200);

  next();
};
