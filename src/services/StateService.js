// const AppError = require('../errors/AppError');

class StateService {
  async fetchStates() {
    const states = [
      { id: 1, name: 'Andhra Pradesh' },
      { id: 2, name: 'Arunachal Pradesh' },
      { id: 3, name: 'Assam' },
      { id: 4, name: 'Bihar' }
    ];
    return states;
  }
}

exports.StateService = StateService;
