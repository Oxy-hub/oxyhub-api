const AppError = require('../errors/AppError');

class ParlourService {
  constructor({ stateRepository }) {
    this.stateRepository = stateRepository;
  }

  async fetchParlour(state, district, type) {
    try {
      const parlours = await this.stateRepository.getParlours(
        state,
        district,
        type
      );

      return parlours;
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

exports.ParlourService = ParlourService;
