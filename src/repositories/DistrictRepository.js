class DistrictRepository {
  constructor({ stateRepository }) {
    this.stateRepository = stateRepository;
  }

  async readDistrictsByState(stateCode) {
    const districts = await this.stateRepository.readState({ code: stateCode });
    return districts;
  }
}

exports.DistrictRepository = DistrictRepository;
