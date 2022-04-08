class OrderRepository {
  //  eslint-disable-next-line
  constructor() {
    // Mongoose client should be set over here
  }
  //  eslint-disable-next-line
  async createNewOrder(userId, parlourId, type) {
    const orderId = '123abc';

    return orderId;
  }

  //  eslint-disable-next-line
  async readOrders(userId) {
    return [
      {
        id: '1',
        name: 'Abcd'
      },
      {
        id: '2',
        name: 'Abcd'
      },
      {
        id: '3',
        name: 'Abcd'
      },
      {
        id: '4',
        name: 'Abcd'
      },
      {
        id: '5',
        name: 'Abcd'
      }
    ];
  }
}

exports.OrderRepository = OrderRepository;
