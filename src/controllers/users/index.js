const { registerUser } = require('./registerUser');
const { getLoggedInUser } = require('./getLoggedInUser');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  registerUser: wrapAsync(registerUser),
  getLoggedInUser: wrapAsync(getLoggedInUser)
};
