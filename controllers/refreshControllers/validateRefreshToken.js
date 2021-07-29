const tokenVerifier = require('../../utils/tokenVerifier');
const {
  findRefreshToken,
  deleteRefreshToken,
  findIsInitial,
} = require('../../utils/helpers/redisHelpers');
const { token } = require('morgan');
exports.validateRefreshToken = async (req, res, next) => {
  try {
    const { RTK } = req.cookies;
    console.log('This is the req.cookie : ', req.cookies);
    console.log('This is my RTK : ', RTK);
    const { jti, id } = tokenVerifier(RTK, 'REFRESH');
    //Check for the refresh token jti in redis database
    const response = await findRefreshToken(id, jti);

    if (response == 0) {
      // next();
      console.log('Successfully validated the Refresh Token');

      //Deleting the corresponding jti of the Refresh Token once validated successfully
      await deleteRefreshToken(id, token);

      const res = await findIsInitial(id);
      if (res) {
        req.isInitial = true;
      } else {
        req.isInitial = false;
      }

      req.user_id = id;
    } else {
      throw new Error('Invalid Refresh Token');
    }
    next();
  } catch (err) {
    console.log('This is error from validateRefreshToken : ', err);
    res.sendStatus(401);
  }
};
