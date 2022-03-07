const { createOrder } = require('./createOrder');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  createOrder: wrapAsync(createOrder)
};
