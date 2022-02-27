const { validateRefreshToken } = require('./validateRefreshToken');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  validateRefreshToken: wrapAsync(validateRefreshToken)
};
