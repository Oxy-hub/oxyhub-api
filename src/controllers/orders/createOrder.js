const { Container } = require('../../loaders/awilix');
const { createSuccessDto, orders: orderDtos } = require('../../dto');

exports.createOrder = async (req, res) => {
  const { parlourId, type } = req.body;
  const { userId } = req;

  const OrderService = Container.resolve('orderService');

  // Check whether booking type is available in the concerned parlour

  // Get back the order id once the order is created
  const order = await OrderService.createOrder(userId, parlourId, type);

  return res.send(
    createSuccessDto(
      `Your order with order no. ${order} is successfully booked!`,
      orderDtos.postResponse(order)
    )
  );
};
