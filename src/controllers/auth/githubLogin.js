const { Container } = require('../../loaders/awilix');
const config = require('../../config');
const { createSuccessDto, authResponseDto } = require('../../dto');

exports.githubLogin = async (req, res) => {
  const { code } = req.body;

  const UserService = Container.resolve('userService');
  const TokenService = Container.resolve('tokenService');

  // Resolve user profile from Github and try to login
  const userProfile = await UserService.useGithubOAuth(code);
  const { isInitial, userId } = await UserService.login(userProfile);

  // If user is inital, do not set refresh token in the cookie, but send the user profile
  if (isInitial) {
    const accessToken = TokenService.generateAccessToken(userId, {
      isInitial: true,
      email: userProfile.email
    });
    return res.send(
      createSuccessDto(
        'New user. Please complete registration!',
        authResponseDto({
          accessToken,
          isInitial,
          isAuthenticated: !isInitial,
          userProfile
        })
      )
    );
  }

  const accessToken = TokenService.generateAccessToken(userId, {
    isInitial: false
  });
  const refreshToken = TokenService.generateRefreshToken(userId);

  return res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true
    })
    .send(
      createSuccessDto(
        'User logged in successfully!',
        authResponseDto({
          accessToken,
          isInitial,
          isAuthenticated: !isInitial
        })
      )
    );
};
