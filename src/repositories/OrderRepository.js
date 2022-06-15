const mongoose = require('mongoose');

class OrderRepository {
  constructor({ OrderModel, InventoryModel }) {
    this.OrderModel = OrderModel;
    this.InventoryModel = InventoryModel;
  }

  toPersistance(
    userId,
    {
      item,
      variant,
      razorpay,
      parlour: { name, storeId, location, ownerName, ownerContact },
      ...rest
    }
  ) {
    return {
      userId,
      storeInfo: {
        name,
        storeId,
        location,
        ownerName,
        ownerContact
      },
      productInfo: {
        sku: variant.sku,
        variant: variant.name,
        productId: item[0].productId,
        type: item[0].cylinderType.label
      },
      razorpay: {
        orderId: razorpay.id
      },
      ...rest
    };
  }

  //  eslint-disable-next-line
  async createOrder(userId, orderInfo) {
    return mongoose.connection.transaction(async session => {
      // Convert data to persistance object
      const persistanceObj = this.toPersistance(userId, orderInfo);

      // Create a new order
      const newOrder = new this.OrderModel(persistanceObj);

      // Save the order in the db
      await newOrder.save({ session });

      const inventory = await this.InventoryModel.findOneAndUpdate(
        {
          productId: orderInfo.item[0].productId,
          'variants.sku': orderInfo.variant.sku
        },
        { $inc: { 'variants.$.quantity': -1 } },
        { new: true }
      ).session(session);

      const variant = inventory.variants.filter(
        v => v.sku === orderInfo.variant.sku
      );

      if (variant[0].quantity < 0) {
        throw new Error('double');
      }
    });
  }

  async readOrders(filter) {
    const orders = await this.OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .exec();

    return orders;
  }

  async updateOrder(filter, newValue) {
    return this.OrderModel.findOneAndUpdate(filter, newValue).exec();
  }

  async fetchOrderByRazorpayId(razorpayOrderId) {
    const order = await this.readOrders({
      'razorpay.orderId': razorpayOrderId
    });

    return order[0];
  }

  async updatePayment(prevRzpOrderId, razorpay) {
    return this.updateOrder(
      {
        'razorpay.orderId': prevRzpOrderId
      },
      {
        'razorpay.status': 1,
        'razorpay.signature': razorpay.razorpay_signature,
        'razorpay.paymentId': razorpay.razorpay_payment_id
      }
    );
  }

  async fetchAllOrders(userId) {
    return this.readOrders({
      userId
    });
  }
}

exports.OrderRepository = OrderRepository;
