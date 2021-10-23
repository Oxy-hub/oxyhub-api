const { registerUser } = require('./registerUser');
const { getUser } = require('./getUser');
const wrapAsync = require('../../utils/helpers/wrapAsync');

module.exports = {
  registerUser: wrapAsync(registerUser),
  getUser: wrapAsync(getUser)
};
