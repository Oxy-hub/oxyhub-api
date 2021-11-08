class AppError {
  constructor(httpStatus, message, errors = []) {
    this.message = message;
    this.httpStatus = httpStatus;
    this.errors = errors;
  }

  static serverError() {
    return new AppError(500, 'Something went wrong!');
  }

  static unauthorized() {
    return new AppError(
      401,
      'Unauthorized! Bearer token is missing or the token is invalid.'
    );
  }
}

module.exports = AppError;
