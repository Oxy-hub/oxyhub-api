const { Container } = require('../../loaders/awilix');
const { createSuccessDto, orders: orderDtos } = require('../../dto');

exports.fetchOrders = async (req, res) => {
  // Resolve order service
  const OrderService = Container.resolve('orderService');

  // Create a new order
  const orders = await OrderService.fetchOrders(req.userId);

  return res.send(
    createSuccessDto(
      `${orders.length} were found.`,
      orderDtos.getResponse(orders)
    )
  );
};
