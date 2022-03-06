class ParlourRepository {
  //  eslint-disable-next-line
  constructor() {
    // Mongoose client should be set over here
  }
  //  eslint-disable-next-line
  async getParlours(state, district, type) {
    return [
      {
        id: 1,
        name: 'Parlour 1'
      },
      {
        id: 2,
        name: 'Parlour 2'
      },
      {
        id: 3,
        name: 'Parlour 2'
      },
      {
        id: 4,
        name: 'Parlour 3'
      },
      {
        id: 5,
        name: 'Parlour 3'
      },
      {
        id: 6,
        name: 'Parlour 4'
      }
    ];
  }
}

exports.ParlourRepository = ParlourRepository;
