const yup = require('yup');

module.exports = yup.object().shape({
  razorpay_payment_id: yup
    .string()
    .trim()
    .required('Razorpay payment id is required'),
  razorpay_order_id: yup
    .string()
    .trim()
    .required('Razorpay order id is required'),
  razorpay_signature: yup
    .string()
    .trim()
    .required('Razorpay signature is required')
});
