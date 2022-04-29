const { Container } = require('../../loaders/awilix');

exports.logoutUser = async (req, res) => {
  const { RTK: refreshToken } = req.cookies;

  const AuthService = Container.resolve('authService');

  await AuthService.logout(refreshToken);

  res
    .clearCookie('RTK', { sameSite: 'none', secure: true, httpOnly: true })
    .sendStatus(200)
    .end();
};
