class UserRepository {
  constructor(MongooseUserModel) {
    this.MongooseUserModel = MongooseUserModel;
  }

  async findByIdAndUpdate(id, userObject) {
    try {
      await this.MongooseUserModel.findByIdAndUpdate(id, userObject, {
        new: true,
        lean: true
      });
    } catch (e) {
      throw new Error('[UserRepository]:[findByIdAndUpdate]');
    }
  }
}

module.exports = UserRepository;
