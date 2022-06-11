const itemControllers = require('../controllers/items');
const { validateDto, isAuth } = require('../middlewares');
const { items } = require('../dto');

module.exports = (router, controllers = itemControllers) => {
  router.get(
    '/:id',
    isAuth,
    validateDto(items.getRequest, 'PARAMS'),
    controllers.fetchItems
  );

  return router;
};
