const { createOrder } = require('./createOrder');
const { confirmOrder } = require('./confirmOrder');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  createOrder: wrapAsync(createOrder),
  confirmOrder: wrapAsync(confirmOrder)
};
