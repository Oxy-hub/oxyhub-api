const AppError = require('../errors/AppError');

class ParlourService {
  constructor({ parlourRepository }) {
    this.parlourRepository = parlourRepository;
  }

  async fetchAllParlours(state, district) {
    const parlours = await this.parlourRepository.getParlours(state, district);

    return parlours;
  }

  async fetchParlourById(id) {
    try {
      const parlour = await this.parlourRepository.getParlourById(id);

      return parlour;
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

exports.ParlourService = ParlourService;
