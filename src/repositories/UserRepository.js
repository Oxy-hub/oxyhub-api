const { promisify } = require('util');
// const logger = require('../loaders/logger');

class UserRepository {
  constructor({ mongooseUserModel, redisClient }) {
    this.MongooseUserModel = mongooseUserModel;
    this.redisClient = redisClient;
    // logger.debug(redisClient);
    // console.log('redis client from user repo : ', redisClient);
    this.del = promisify(redisClient.del).bind(redisClient);
    this.set = promisify(redisClient.set).bind(redisClient);
    this.get = promisify(redisClient.get).bind(redisClient);
  }

  toPersistance(user) {
    return {
      firstName: user.first_name,
      middleName: user.middle_name,
      lastName: user.last_name,
      email: user.email
    };
  }

  async createUser(user) {
    const newUser = new this.MongooseUserModel(this.toPersistance(user));
    await newUser.save();
    return newUser;
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

  async readUserById(userId) {
    const user = await this.MongooseUserModel.findById(userId).exec();
    return user;
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

exports.UserRepository = UserRepository;
