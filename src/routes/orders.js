const orderControllers = require('../controllers/orders');
const { validateDto } = require('../middlewares');
const { orders } = require('../dto');

module.exports = (router, controllers = orderControllers) => {
  router.post('/', validateDto(orders.postRequest), controllers.createOrder);

  //   router.get('/', controllers.viewOrders);

  return router;
};
