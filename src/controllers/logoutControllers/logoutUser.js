// const {
//   deleteRefreshToken,
//   blacklistToken
// } = require('../../utils/helpers/redisHelpers');
// // const tokenVerifier = require('../../utils/helpers/tokenVerifierHelper');

// const wrapAsync = require('../wrapAsync');

// exports.logoutUser = wrapAsync(async (req, res) => {
//   // const { RTK } = req.cookies;
//   const { authorization } = req.headers;
//   const accessToken = authorization.split(' ')[1];

//   // Try to verify the refresh token's validity and extract the payload
//   // const { jti, id } = tokenVerifier(RTK, 'REFRESH');

//   // Deleting the corresponding userid:jti key in redis
//   await deleteRefreshToken(id, jti);

//   // Blacklist Access Token
//   await blacklistToken(id, accessToken);

//   res.sendStatus(200);
// });
