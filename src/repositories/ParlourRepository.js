class ParlourRepository {
  constructor({ ParlourModel }) {
    this.ParlourModel = ParlourModel;
  }

  async readParlour(filter) {
    const parlours = await this.ParlourModel.find(filter).exec();
    return parlours;
  }

  async getParlours(stateCode, district) {
    return this.readParlour({
      'location.stateCode': stateCode,
      'location.district': district
    });
  }

  async getParlourById(id) {
    return {
      id,
      name: 'The Great Parlour',
      address: '14,Abcd Road'
    };
  }
}

exports.ParlourRepository = ParlourRepository;
