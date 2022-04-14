const refreshControllers = require('../controllers/refresh');

module.exports = (router, controllers = refreshControllers) => {
  router.get('/', controllers.refreshUser);

  return router;
};
