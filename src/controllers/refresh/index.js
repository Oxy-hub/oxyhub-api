const { refreshUser } = require('./refreshUser');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  refreshUser: wrapAsync(refreshUser)
};
