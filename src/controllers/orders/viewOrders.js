const { Container } = require('../../loaders/awilix');
const { createSuccessDto, orders: orderDtos } = require('../../dto');

exports.viewOrders = async (req, res) => {
  const { userId } = req;

  const OrderService = Container.resolve('orderService');

  // Fetch all the orders for the user
  const orders = await OrderService.fetchOrders(userId);

  return res.send(
    createSuccessDto(
      `${orders.length} orders found for the user!`,
      orderDtos.getResponse(orders)
    )
  );
};
