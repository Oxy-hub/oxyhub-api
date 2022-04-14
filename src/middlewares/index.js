const isAuth = require('./isAuth');
const isInitialAuth = require('./isInitialAuth');
const enableOptionalAuth = require('./enableOptionalAuth');
const { validateDto } = require('./validateDto');

const init = () => {
  // Do nothing for now
};

module.exports = {
  init,
  isAuth,
  isInitialAuth,
  enableOptionalAuth,
  validateDto
};
