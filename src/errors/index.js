const errorHandler = require('./errorHandler');

const init = app => {
  app.use(errorHandler);
};

module.exports = { init };
