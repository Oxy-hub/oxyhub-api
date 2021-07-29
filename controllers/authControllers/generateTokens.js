const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/helpers/tokenGeneratorHelpers');
const { storeRefreshToken } = require('../../utils/helpers/redisHelpers');
const { v4: uuidv4 } = require('uuid');

exports.generateTokens = async (req, res) => {
  try {
    //Creating the random ungusseable string
    const jti = uuidv4();

    //Access and refresh token generation using jsonwebtoken
    const access_token = generateAccessToken({ id: req.user_id });
    const refresh_token = generateRefreshToken({ jti, id: req.user_id });

    // Store the JTI in redis as a key in the format userid:jti
    await storeRefreshToken(req.user_id, jti);

    // Set cookies and send back the response
    res
      .cookie('RTK', refresh_token, {
        httpOnly: true,
        maxAge: process.env.REFRESH_TOKEN_EXPIRY_3D_MS,
        secure: true,
      })
      .send({
        access_token,
        isAuthenticated: !req.isInitial,
        isInitial: req.isInitial,
      });
  } catch (err) {
    console.log('This error is from generateTokens : ', err);
  }
};
