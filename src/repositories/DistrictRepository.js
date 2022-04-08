class DistrictRepository {
  //  eslint-disable-next-line
  constructor() {
    // Mongoose client should be set over here
  }
  //  eslint-disable-next-line
  async getDistrictsByState(state) {
    return [
      {
        id: 1,
        name: 'Darjeeling'
      },
      {
        id: 2,
        name: 'Malda'
      },
      {
        id: 3,
        name: 'Uttar Dinajpur'
      },
      {
        id: 4,
        name: 'Birbhum'
      },
      {
        id: 5,
        name: 'Hoogly'
      },
      {
        id: 6,
        name: 'Malda'
      }
    ];
  }
}

exports.DistrictRepository = DistrictRepository;
