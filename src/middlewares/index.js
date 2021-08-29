const auth = require('./auth');
const protectedRoutes = require('../utils/helpers/protectedRoutes');

const init = app => {
  app.use(protectedRoutes, auth);
};

module.exports = { init };
