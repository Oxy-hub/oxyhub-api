const { Container } = require('../../loaders/awilix');
const { createSuccessDto, orders: orderDtos } = require('../../dto');

exports.fetchOrders = async (req, res) => {
  // Resolve order service
  const OrderService = Container.resolve('orderService');

  // Create a new order
  const orders = await OrderService.fetchOrders('626ac0394ddbb4001d050ea4');

  return res.send(
    createSuccessDto(
      `${orders.length} were found.`,
      orderDtos.getResponse(orders)
    )
  );
};
