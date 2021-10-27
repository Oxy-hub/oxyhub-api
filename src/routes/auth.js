const authControllers = require('../controllers/auth');
const { validateDto } = require('../middlewares');
const { authRequestDto } = require('../dto');

module.exports = (router, controllers = authControllers) => {
  router.post('/google', controllers.googleLogin);
  router.post('/github', validateDto(authRequestDto), controllers.githubLogin);

  return router;
};
