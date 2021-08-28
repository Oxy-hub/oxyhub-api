class AppError {
  constructor(httpStatus, message) {
    this.message = message;
    this.httpStatus = httpStatus;
  }

  static serverError() {
    return new AppError(500, 'Something went wrong!');
  }
}

module.exports = AppError;
