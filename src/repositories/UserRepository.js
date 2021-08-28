const { promisify } = require('util');

class UserRepository {
  constructor({ mongooseUserModel, redisClient }) {
    this.mongooseUserModel = mongooseUserModel;
    this.redisClient = redisClient;
    this.del = promisify(redisClient.del).bind(redisClient);
  }

  async updateUser(id, userObject) {
    await this.mongooseUserModel.findByIdAndUpdate(id, userObject, {
      new: true,
      lean: true
    });
  }

  async readIsInitial(userId) {
    const response = await this.get(`${userId}:initial`);
    return response;
  }

  async deleteIsInitial(id) {
    await this.del(`${id}:initial`);
  }
}

module.exports = UserRepository;
