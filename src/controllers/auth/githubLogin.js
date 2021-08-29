const { Container } = require('../../loaders/awilix');
const config = require('../../config');
const AppError = require('../../errors/AppError');

// eslint-disable-next-line
exports.githubLogin = (req, res, next) => {
  const { code } = req.query;
  if (!code) throw new AppError(400, 'Bad Request! Code is missing!');
  const UserService = Container.resolve('userService');
  const TokenService = Container.resolve('tokenService');
  const userProfile = UserService.useGithubOAuth(code);
  const { isInitial, userId } = UserService.login(userProfile);
  const { accessToken, refreshToken } =
    TokenService.generateLoginTokens(userId);

  res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true
    })
    .send({
      accessToken,
      isAuthenticated: !isInitial,
      isInitial
    });
};
