const AppError = require('../errors/AppError');

// eslint-disable-next-line
exports.validateDto = schema => async (req, _, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    next();
  } catch (err) {
    // console.log(err.errors);
    next(new AppError(400, 'Input validation failed!', err.errors));
  }
};
