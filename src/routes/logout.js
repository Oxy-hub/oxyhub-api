const logoutControllers = require('../controllers/logout');
const { isAuth } = require('../middlewares');

module.exports = (router, controllers = logoutControllers) => {
  router.post('/', isAuth, controllers.logoutUser);

  return router;
};
