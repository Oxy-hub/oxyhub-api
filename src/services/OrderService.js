const crypto = require('crypto-js');

const config = require('../config');
const AppError = require('../errors/AppError');

class OrderService {
  constructor({ razorpay, itemService, parlourService, orderRepository }) {
    this.razorpay = razorpay;
    this.itemService = itemService;
    this.parlourService = parlourService;
    this.orderRepository = orderRepository;
  }

  async createNewOrder(userId, orderInfo) {
    // Fetch parlour and product details
    const [item, parlour] = await Promise.all([
      this.itemService.fetchProduct(orderInfo.store_id, orderInfo.product_id),
      this.parlourService.fetchParlourByStoreId(orderInfo.store_id)
    ]);

    // If items or parlour is empty, either store_id or product_id is wrong
    if (item.length === 0 || item.length === 0)
      throw new AppError(400, 'The product or store could not be found');

    // Filter out the requried variant (Can be done by mongodb projection)
    const variant = item[0].variants.filter(v => v.sku === orderInfo.sku)[0];

    // Calculate price
    let pricing = { purchaseType: orderInfo.purchase_type };
    switch (pricing.purchaseType) {
      case 0:
        // Purchase type is rent
        pricing = {
          ...pricing,
          duration: orderInfo.duration,
          rate: variant.price.rent,
          total: orderInfo.duration * variant.price.rent
        };
        break;

      case 1:
        // Purchase type is buy
        pricing = {
          ...pricing,
          duration: null,
          rate: variant.price.sale,
          total: variant.price.sale
        };
        break;

      default:
        throw new Error();
    }

    const razorpayOptions = {
      currency: 'INR',
      // Amount must be in the smallest currency unit
      amount: pricing.total * 100
    };

    return new Promise((res, rej) => {
      this.razorpay.orders.create(razorpayOptions, async (err, order) => {
        try {
          if (err) {
            rej(new Error());
          } else {
            await this.orderRepository.createOrder(userId, {
              item,
              parlour,
              variant,
              pricing,
              razorpay: order
            });
            res({ orderId: order.id, amount: razorpayOptions.amount });
          }
        } catch (e) {
          if (e.message === 'double')
            rej(
              new AppError(400, 'Sorry. This cylinder has already been booked!')
            );
          else throw new Error();
        }
      });
    });
  }

  async confirmOrder(razorpay) {
    // Fetch existing order
    const order = await this.orderRepository.fetchOrderByRazorpayId(
      razorpay.razorpay_order_id
    );

    // Generate HASH of the razorpay signature using HMAC-SHA256 algorithm
    const expectedSignature = crypto.HmacSHA256(
      `${order.razorpay.orderId}|${razorpay.razorpay_payment_id}`,
      config.razorpay.keySecret
    );

    // Verify whether the signatures match
    if (expectedSignature.toString() !== razorpay.razorpay_signature)
      throw new Error();

    // Updated payment info for the existing order
    await this.orderRepository.updatePayment(order.razorpay.orderId, razorpay);
  }
}

exports.OrderService = OrderService;
