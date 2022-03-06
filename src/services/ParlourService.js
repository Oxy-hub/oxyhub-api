const AppError = require('../errors/AppError');

class ParlourService {
  constructor({ parlourRepository }) {
    this.parlourRepository = parlourRepository;
  }

  async fetchParlours(state, district, type) {
    try {
      const parlours = await this.parlourRepository.getParlours(
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
