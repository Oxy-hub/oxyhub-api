const AppError = require('../../errors/AppError');

exports.googleLogin = () => {
  throw new AppError(500, 'Google Login is unavailable! Please try later');
};
