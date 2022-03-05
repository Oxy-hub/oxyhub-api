class StateRepository {
  //  eslint-disable-next-line
  constructor() {
    // Mongoose client should be set over here
  }
  //  eslint-disable-next-line
  async getAllStates() {
    return [
      { id: 1, name: 'Andhra Pradesh' },
      { id: 2, name: 'Arunachal Pradesh' },
      { id: 3, name: 'Assam' },
      { id: 4, name: 'Bihar' }
    ];
  }
}

exports.StateRepository = StateRepository;
