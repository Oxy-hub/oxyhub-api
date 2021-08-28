const { githubLogin } = require('./githubLogin');
const { googleLogin } = require('./googleLogin');
const wrapAsync = require('../../utils/helpers/wrapAsync');

module.exports = {
  googleLogin: wrapAsync(googleLogin),
  githubLogin: wrapAsync(githubLogin)
};
