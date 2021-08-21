// eslint-disable-next-line
const handleError = (err, req, res, next) => {
  const { status, message } = err;
  res.sendStatus(status).send({ status, message });
};

module.exports = handleError;
