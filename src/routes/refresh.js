const refreshControllers = require('../controllers/refresh');

module.exports = (router, controllers = refreshControllers) => {
  router.get('/', controllers.validateRefreshToken);

  return router;
};
