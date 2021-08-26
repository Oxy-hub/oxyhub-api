const { promisify } = require('util');
// const config = require('../config');

class TokenRepository {
  constructor({ redisClient }) {
    this.redisClient = redisClient;
    this.sadd = promisify(redisClient.sadd).bind(redisClient);
    this.smembers = promisify(redisClient.smembers).bind(redisClient);
    this.get = promisify(redisClient.get).bind(redisClient);
    this.expire = promisify(redisClient.expire).bind(redisClient);
  }

  async readBlackList(userId, token) {
    const response = await this.smembers(userId);
    return response.includes(token);
  }

  async readIsInitial(userId) {
    const response = await this.get(`${userId}:initial`);
    return response;
  }
}

module.exports = TokenRepository;