const AppError = require('../errors/AppError');

class OrderService {
  constructor({ ordertRepository }) {
    this.ordertRepository = ordertRepository;
  }

  async createOrder(userId, parlourId, type) {
    try {
      const order = await this.ordertRepository.createNewOrder(
        userId,
        parlourId,
        type
      );

      return order;
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

exports.OrderService = OrderService;
