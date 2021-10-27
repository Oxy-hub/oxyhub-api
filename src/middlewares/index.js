const { authMiddleware } = require('./auth');
const protectedRoutes = require('../utils/helpers/protectedRoutes');
const { validateDto } = require('./validateDto');

const init = app => {
  app.use(protectedRoutes, authMiddleware);
};

module.exports = { init, validateDto };
