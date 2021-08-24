const { v4: uuidv4 } = require('uuid');
const {
  generateAccessToken,
  generateRefreshToken
} = require('../../utils/helpers/tokenGeneratorHelpers');
const { storeRefreshToken } = require('../../utils/helpers/redisHelpers');

const wrapAsync = require('../wrapAsync');

exports.generateTokens = wrapAsync(async (req, res) => {
  // Creating the random ungusseable string
  const jti = uuidv4();

  // Access and refresh token generation using jsonwebtoken
  const accessToken = generateAccessToken({ id: req.user_id });
  const refreshToken = generateRefreshToken({ jti, id: req.user_id });

  // Store the JTI in redis as a key in the format userid:jti
  await storeRefreshToken(req.user_id, jti);

  // Set cookies and send back the response
  res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: process.env.REFRESH_TOKEN_EXPIRY_3D_MS
      // secure: true,
    })
    .send({
      accessToken,
      isAuthenticated: !req.isInitial,
      isInitial: req.isInitial
    });
});
