const { createOrder } = require('./createOrder');
const { confirmOrder } = require('./confirmOrder');
const { fetchOrders } = require('./fetchOrders');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  fetchOrders: wrapAsync(fetchOrders),
  createOrder: wrapAsync(createOrder),
  confirmOrder: wrapAsync(confirmOrder)
};
