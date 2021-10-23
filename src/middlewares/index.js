const { authMiddleware } = require('./auth');
const protectedRoutes = require('../utils/helpers/protectedRoutes');

const init = app => {
  app.use(protectedRoutes, authMiddleware);
};

module.exports = { init };
