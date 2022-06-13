const Razorpay = require('razorpay');

const { razorpay } = require('../config');

module.exports = new Razorpay({
  key_id: razorpay.keyId,
  key_secret: razorpay.keySecret
});
