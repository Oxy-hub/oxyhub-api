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

  // Generate login tokens
  const { accessToken, refreshToken } = TokenService.generateLoginTokens(
    userId,
    isInitial
  );

  // If user is inital, do not set refresh token in the cookie, but send the user profile
  if (isInitial) {
    return res
      .cookie('RTK', refreshToken, {
        httpOnly: true,
        maxAge: config.tokens.expiry.refreshToken,
        secure: true
      })
      .send(
        createSuccessDto(
          'New user. Please complete signup!',
          authResponseDto({
            accessToken,
            isInitial,
            isAuthenticated: !isInitial,
            userProfile
          })
        )
      );
  }

  return res.send(
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
