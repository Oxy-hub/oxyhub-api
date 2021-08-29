const { promisify } = require('util');

class UserRepository {
  constructor({ mongooseUserModel, redisClient }) {
    this.MongooseUserModel = mongooseUserModel;
    this.redisClient = redisClient;
    this.del = promisify(redisClient.del).bind(redisClient);
    this.set = promisify(redisClient.set).bind(redisClient);
    this.get = promisify(redisClient.get).bind(redisClient);
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

  constructInitialKey(id) {
    return `${id}:initial`;
  }

  async createIsInitialInRedis(id) {
    await this.set(this.constructInitialKey(id), true);
  }

  async readIsInitialFromRedis(id) {
    const response = await this.get(this.constructInitialKey(id));
    return response;
  }

  async deleteIsInitialFromRedis(id) {
    await this.del(this.constructInitialKey(id));
  }
}

module.exports = UserRepository;
