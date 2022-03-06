const parlourControllers = require('../controllers/parlours');
const { validateDto } = require('../middlewares');
const { parlours } = require('../dto');

module.exports = (router, controllers = parlourControllers) => {
  router.get(
    '/',
    validateDto(parlours.getRequest, 'QUERY'),
    controllers.fetchParlours
  );

  router.get(
    '/:id',
    validateDto(parlours.getByIdRequest, 'PARAMS'),
    controllers.fetchParlourById
  );
  return router;
};
