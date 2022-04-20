const stateControllers = require('../controllers/states');
const { isAuth } = require('../middlewares');

module.exports = (router, controllers = stateControllers) => {
  router.get('/', isAuth, controllers.fetchStates);

  return router;
};
