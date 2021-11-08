const { registerUser } = require('./registerUser');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  registerUser: wrapAsync(registerUser)
};
