const orderControllers = require('../controllers/orders');
const { isAuth, validateDto } = require('../middlewares');
const { orders } = require('../dto');

module.exports = (router, controllers = orderControllers) => {
  router.post(
    '/',
    isAuth,
    validateDto(orders.postRequest),
    controllers.createOrder
  );

  router.put(
    '/',
    isAuth,
    validateDto(orders.putRequest),
    controllers.confirmOrder
  );

  return router;
};
