class AppError extends Error {
  constructor(httpStatus, message) {
    super();
    this.message = message;
    this.httpStatus = httpStatus;
  }

  static serverError() {
    return { httpStatus: 500, message: 'Something Went Wrong!' };
  }
}

module.exports = AppError;
