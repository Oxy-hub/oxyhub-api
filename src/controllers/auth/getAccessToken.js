// const wrapAsync = require('../../utils/wrapAsync');

exports.getAccessToken = async (req, res, next) => {
  const { code } = req.query;
  const response = await req.exchangeCodeForAccessToken(code);
  req.access_token = response.data.access_token;
  next();
};
