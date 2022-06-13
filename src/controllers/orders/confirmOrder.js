const { Container } = require('../../loaders/awilix');
const { createSuccessDto } = require('../../dto');

exports.confirmOrder = async (req, res) => {
  // Resolve order service from the container
  const OrderService = Container.resolve('orderService');

  // Confirm the payment status of the order
  await OrderService.confirmOrder(req.body);

  return res.send(createSuccessDto('Payment successfully completed'));
};
