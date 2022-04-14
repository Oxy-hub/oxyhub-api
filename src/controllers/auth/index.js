const { oAuthLogin } = require('./oAuthLogin');
const { callbackHandler } = require('./callbackHandler');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  oAuthLogin: wrapAsync(oAuthLogin),
  callbackHandler
};
