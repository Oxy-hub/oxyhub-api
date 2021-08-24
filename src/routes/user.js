const userControllers = require('../controllers/user');

module.exports = (router, controllers = userControllers) => {
  router.post('/', controllers.registerUser);

  return router;
};
