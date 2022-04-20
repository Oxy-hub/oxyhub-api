class StateRepository {
  constructor({ StateModel }) {
    this.StateModel = StateModel;
  }

  async readState(filter) {
    const state = await this.StateModel.findOne(filter).exec();
    return state;
  }

  async readAllStates() {
    const states = await this.StateModel.find({})
      .sort({ name: 1 })
      .select({ name: 1, code: 1 })
      .exec();
    return states;
  }
}

exports.StateRepository = StateRepository;
