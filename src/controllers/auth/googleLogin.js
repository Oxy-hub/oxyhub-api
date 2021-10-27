const AppError = require('../../errors/AppError');

exports.googleLogin = (req, res, next) => {
  next(new AppError(500, 'Google Login is unavailable! Please try later'));
};
