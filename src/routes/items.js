const itemControllers = require('../controllers/items');
const { validateDto } = require('../middlewares');
const { items } = require('../dto');

module.exports = (router, controllers = itemControllers) => {
  router.get(
    '/:id',
    validateDto(items.getRequest, 'PARAMS'),
    controllers.fetchItems
  );

  return router;
};
