const { Container } = require('../../loaders/awilix');
const { createSuccessDto, orders: orderDtos } = require('../../dto');

exports.createOrder = async (req, res) => {
  // Resolve order service
  const OrderService = Container.resolve('orderService');

  // Create a new order
  const order = await OrderService.createNewOrder(req.userId, req.body);

  return res.send(
    createSuccessDto(
      'Order has been created. Please complete your payment',
      orderDtos.postResponse(order)
    )
  );
};
