const AppError = require('../errors/AppError');

class DistrictService {
  constructor({ districtRepository }) {
    this.districtRepository = districtRepository;
  }

  async fetchDistricts(state) {
    try {
      const districts = await this.districtRepository.getDistrictsByState(
        state
      );

      return districts;
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

exports.DistrictService = DistrictService;
