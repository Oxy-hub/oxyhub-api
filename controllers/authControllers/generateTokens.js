const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenGenerator');
const { v4: uuidv4 } = require('uuid');
exports.generateTokens = (req, res, next) => {
  try {
    //Access token generation using jsonwebtoken
    const accessToken = generateAccessToken({ email: req.user.email });

    //Creating the random jti
    const jti = uuidv4();

    //Refresh token generation using jsonwebtoken
    const refreshToken = generateRefreshToken({ jti, email: req.user.email });

    //Sending back HTTPonly cookie in response object
    res
      .cookie('RTK', refreshToken, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .send({ accessToken, user: req.user });
  } catch (err) {
    console.log('This error is from generateTokens : ', err);
  }
};
