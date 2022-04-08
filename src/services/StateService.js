const AppError = require('../errors/AppError');

class StateService {
  constructor({ stateRepository }) {
    this.stateRepository = stateRepository;
  }

  async fetchStates() {
    try {
      const states = await this.stateRepository.getAllStates();

      return states;
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

exports.StateService = StateService;
