const { Container } = require('../../loaders/awilix');
const { createSuccessDto, refresh: refreshDto } = require('../../dto');
const config = require('../../config');

exports.refreshUser = async (req, res) => {
  // Extract refresh token from cookies
  const { RTK: userRefreshToken } = req.cookies;

  // Resolve auth service from container
  const AuthService = Container.resolve('authService');

  // Fetch the userId from the refresh token
  const userId = await AuthService.verifyRefreshToken(userRefreshToken);

  // Generate new pair of access and refresh tokens
  const accessToken = AuthService.generateAccessToken(userId);
  const refreshToken = await AuthService.generateRefreshToken(userId);

  return res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true
    })
    .send(
      createSuccessDto(
        'User logged in successfully!',
        refreshDto.getResponse({
          accessToken
        })
      )
    );
};
