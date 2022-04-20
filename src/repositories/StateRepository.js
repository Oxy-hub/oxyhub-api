class StateRepository {
  constructor({ StateModel }) {
    this.StateModel = StateModel;
  }

  async readAllStates() {
    const res = await this.StateModel.find({})
      .sort({ name: 1 })
      .select({ name: 1, code: 1 })
      .exec();
    return res;
  }
}

exports.StateRepository = StateRepository;
