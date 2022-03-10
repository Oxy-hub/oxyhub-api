const AppError = require('../errors/AppError');

class OrderService {
  constructor({ orderRepository }) {
    this.orderRepository = orderRepository;
  }

  async createOrder(userId, parlourId, type) {
    try {
      const order = await this.orderRepository.createNewOrder(
        userId,
        parlourId,
        type
      );

      return order;
    } catch (e) {
      throw AppError.serverError();
    }
  }

  async fetchOrders(userId) {
    try {
      // if (!userId) {
      //   throw new Error();
      // }

      const orders = await this.orderRepository.readOrders(userId);

      return orders;
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

exports.OrderService = OrderService;
