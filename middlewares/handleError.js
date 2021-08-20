// eslint-disable-next-line
exports.handleError = (err, req, res, next) => {
  const { status, message } = err;

  res.sendStatus(status).send({ status, message });
};
