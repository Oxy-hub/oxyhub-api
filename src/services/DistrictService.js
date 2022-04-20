const AppError = require('../errors/AppError');

class DistrictService {
  constructor({ districtRepository }) {
    this.districtRepository = districtRepository;
  }

  async fetchDistricts(state) {
    const districts = await this.districtRepository.readDistrictsByState(state);

    if (!districts) {
      throw new AppError(400, 'Invalid State Code!');
    }

    return districts;
  }
}

exports.DistrictService = DistrictService;
