const AppError = require('../../errors/AppError');
const { Container } = require('../../loaders/awilix');

exports.getUser = (req, res) => {
  if (req.userId) {
    const UserServiceInstance = Container.resolve('userService');

    const user = UserServiceInstance.fetchUser(req.userId);
    res.send(user);
  } else {
    throw AppError.unauthorized();
  }
};
