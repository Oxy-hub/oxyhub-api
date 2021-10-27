const AppError = require('./AppError');
const { createErrorDto } = require('../dto');

// eslint-disable-next-line
const handleError = (err, _, res, next) => {
  if (!(err instanceof AppError)) {
    // eslint-disable-next-line
    err = AppError.serverError();
  }

  console.log('Error from HandleError : ', err);
  const { httpStatus } = err;
  res.status(httpStatus).send(createErrorDto(err));
};

module.exports = handleError;
