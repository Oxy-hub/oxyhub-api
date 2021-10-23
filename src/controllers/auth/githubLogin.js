const { Container } = require('../../loaders/awilix');
const config = require('../../config');
const AppError = require('../../errors/AppError');

// eslint-disable-next-line
exports.githubLogin = async (req, res, next) => {
  const { code } = req.query;
  if (!code) throw new AppError(400, 'Bad Request! Code is missing!');
  const UserService = Container.resolve('userService');
  const TokenService = Container.resolve('tokenService');
  const userProfile = await UserService.useGithubOAuth(code);
  // console.log(userProfile);
  const { isInitial, userId } = await UserService.login(userProfile);
  console.log({ isInitial, userId });
  const { accessToken, refreshToken } =
    TokenService.generateLoginTokens(userId);
  console.log({ accessToken, refreshToken });

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
