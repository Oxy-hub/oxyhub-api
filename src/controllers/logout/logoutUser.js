const { Container } = require('../../loaders/awilix');

exports.logoutUser = async (req, res) => {
  const { RTK: refreshToken } = req.cookies;

  const AuthService = Container.resolve('authService');

  await AuthService.logout(refreshToken);

  res.cookie('RTK', '').sendStatus(200);
};
