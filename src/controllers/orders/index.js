const { createOrder } = require('./createOrder');
const { viewOrders } = require('./viewOrders');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  createOrder: wrapAsync(createOrder),
  viewOrders: wrapAsync(viewOrders)
};
