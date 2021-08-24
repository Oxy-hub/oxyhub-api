const tokenVerifier = require('../../utils/helpers/tokenVerifierHelper');
const {
  findRefreshToken,
  deleteRefreshToken,
  findIsInitial
} = require('../../utils/helpers/redisHelpers');

const wrapAsync = require('../wrapAsync');
const AppError = require('../../utils/AppError');

exports.validateRefreshToken = wrapAsync(async (req, res, next) => {
  const { RTK } = req.cookies;
  // Try to verify the refresh token's validity
  const { jti, id } = tokenVerifier(RTK, 'REFRESH');

  // Check for the userid:jti key in redis, will return true if present
  const response = await findRefreshToken(id, jti);
  if (!response) throw new AppError('Invalid refresh token', 400);

  // Deleting the corresponding userid:jti key in redis
  await deleteRefreshToken(id, jti);

  // Try to find if user is set as an initial user in redis
  req.isInitial = await findIsInitial(id);

  // Attach the user id to the req object for the generate token middleware
  req.user_id = id;
  console.log('Successfully validated the Refresh Token');
  next();
});
