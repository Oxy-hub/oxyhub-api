const auth = require('./auth');
const protectedRoutes = require('../utils/protectedRoutes');

const init = app => {
  app.use(protectedRoutes, auth);
};

module.exports = { init };
