const { githubLogin } = require('./githubLogin');
const { googleLogin } = require('./googleLogin');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  googleLogin: wrapAsync(googleLogin),
  githubLogin: wrapAsync(githubLogin)
};
