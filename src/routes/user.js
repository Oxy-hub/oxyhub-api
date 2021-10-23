const userControllers = require('../controllers/user');

module.exports = (router, controllers = userControllers) => {
  router.post('/', controllers.registerUser);
  router.get('/', controllers.getUser);

  return router;
};
