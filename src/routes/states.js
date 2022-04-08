const stateControllers = require('../controllers/states');

module.exports = (router, controllers = stateControllers) => {
  router.get('/', controllers.fetchStates);

  return router;
};
