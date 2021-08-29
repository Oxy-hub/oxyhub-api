const AppError = require('./AppError');

// eslint-disable-next-line
const handleError = (err, _, res, next) => {
  console.log(err);
  if (!(err instanceof AppError)) {
    // eslint-disable-next-line
    err = AppError.serverError();
  }

  const { httpStatus, message } = err;
  res.status(httpStatus).send({ httpStatus, message });
};

module.exports = handleError;
