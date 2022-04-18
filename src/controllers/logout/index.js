const { logoutUser } = require('./logoutUser');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  logoutUser: wrapAsync(logoutUser)
};
