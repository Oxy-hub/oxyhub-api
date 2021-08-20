const tokenVerifier = require('../../utils/tokenVerifier');
const {
  findRefreshToken,
  deleteRefreshToken,
  findIsInitial
} = require('../../utils/helpers/redisHelpers');

exports.validateRefreshToken = async (req, res, next) => {
  try {
    const { RTK } = req.cookies;
    // Try to verify the refresh token's validity
    const { jti, id } = tokenVerifier(RTK, 'REFRESH');

    // Check for the userid:jti key in redis, will return true if present
    const response = await findRefreshToken(id, jti);
    if (!response) throw new Error('RTK missing in redis');

    // Deleting the corresponding userid:jti key in redis
    await deleteRefreshToken(id, jti);

    // Try to find if user is set as an initial user in redis
    req.isInitial = await findIsInitial(id);

    // Attach the user id to the req object for the generate token middleware
    req.user_id = id;
    console.log('Successfully validated the Refresh Token');
    next();
  } catch (err) {
    console.log('This is error from validateRefreshToken : ', err);
    res.sendStatus(401);
  }
};
