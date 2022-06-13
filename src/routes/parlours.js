const parlourControllers = require('../controllers/parlours');
const { validateDto, isAuth } = require('../middlewares');
const { parlours } = require('../dto');

module.exports = (router, controllers = parlourControllers) => {
  router.get(
    '/',
    isAuth,
    validateDto(parlours.getRequest, 'QUERY'),
    controllers.fetchParlours
  );

  router.get(
    '/:id',
    isAuth,
    validateDto(parlours.getByIdRequest, 'PARAMS'),
    controllers.fetchParlourById
  );
  return router;
};
