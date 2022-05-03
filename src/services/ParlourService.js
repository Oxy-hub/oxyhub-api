const AppError = require('../errors/AppError');

class ParlourService {
  constructor({ parlourRepository }) {
    this.parlourRepository = parlourRepository;
  }

  async fetchAllParlours(state, district) {
    const parlours = await this.parlourRepository.getParlours(state, district);

    return parlours;
  }

  async fetchParlourByStoreId(id) {
    const parlour = await this.parlourRepository.getParlourByStoreId(id);

    if (parlour.length === 0) {
      throw new AppError(400, `Parlour with id : ${id} could not be found!`);
    }

    return parlour[0];
  }
}

exports.ParlourService = ParlourService;
