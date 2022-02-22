// const tokenVerifier = require('../../utils/helpers/tokenVerifierHelper');
// const {
//   findRefreshToken,
//   deleteRefreshToken,
//   findIsInitial
// } = require('../../utils/helpers/redisHelpers');

// const wrapAsync = require('../wrapAsync');
// const AppError = require('../../utils/AppError');

// exports.validateRefreshToken = wrapAsync(async (req, res, next) => {
//   const { RTK } = req.cookies;
//   // Try to verify the refresh token's validity
//   const { jti, id } = tokenVerifier(RTK, 'REFRESH');

//   // Check for the userid:jti key in redis, will return true if present
//   const response = await findRefreshToken(id, jti);
//   if (!response) throw new AppError('Invalid refresh token', 400);

//   // Deleting the corresponding userid:jti key in redis
//   await deleteRefreshToken(id, jti);

//   // Try to find if user is set as an initial user in redis
//   req.isInitial = await findIsInitial(id);

//   // Attach the user id to the req object for the generate token middleware
//   req.user_id = id;
//   console.log('Successfully validated the Refresh Token');
//   next();
// });

const { Container } = require('../../loaders/awilix');
const { createSuccessDto, refreshResponseDto } = require('../../dto');
const config = require('../../config');

exports.validateRefreshToken = async (req, res) => {
  // Read RTK (refresh_token from the cookies)
  console.log('1');
  const { RTK: userRefreshToken } = req.cookies;
  console.log('Refresh Token', userRefreshToken);

  console.log('A');
  // Resolve token service from container
  const TokenService = Container.resolve('tokenService');

  console.log('B');
  // Fetch the User from user service
  const userId = await TokenService.verifyRefreshToken(userRefreshToken);
  // const userId = '223abc';

  console.log('C');
  const refreshToken = await TokenService.generateRefreshToken(userId);
  console.log(refreshToken);

  console.log('D');
  const accessToken = TokenService.generateAccessToken(userId);

  return res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true
    })
    .send(
      createSuccessDto(
        'User logged in successfully!',
        refreshResponseDto({
          accessToken
        })
      )
    );
};
