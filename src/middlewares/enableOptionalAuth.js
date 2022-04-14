module.exports = async (req, res, next) => {
  req.isOptionalAuth = true;
  next();
};
