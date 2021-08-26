const authControllers = require('../controllers/auth');

module.exports = (router, controllers = authControllers) => {
  router.post('/google', controllers.googleLogin);
  router.post('/github', controllers.githubLogin);

  return router;
};
