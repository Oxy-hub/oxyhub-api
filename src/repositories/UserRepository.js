const { promisify } = require('util');

class UserRepository {
  constructor({ mongooseUserModel, redisClient }) {
    this.MongooseUserModel = mongooseUserModel;
    this.redisClient = redisClient;
    this.del = promisify(redisClient.del).bind(redisClient);
    this.set = promisify(redisClient.set).bind(redisClient);
  }

  async updateUser(id, userObject) {
    await this.MongooseUserModel.findByIdAndUpdate(id, userObject, {
      new: true,
      lean: true
    });
  }

  async readUserByEmail(email) {
    const user = await this.MongooseUserModel.findOne({ email }).exec();
    return user;
  }

  async createUser(user) {
    const newUser = new this.MongooseUserModel(user);
    await newUser.save();
    return newUser;
  }

  async updateIsInitial(id) {
    await this.set(`${id}:initial`, true);
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
