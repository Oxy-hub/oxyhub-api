const { promisify } = require('util');
const config = require('../config');

class TokenRepository {
  constructor({ redisClient }) {
    this.redisClient = redisClient;
    this.sadd = promisify(redisClient.sadd).bind(redisClient);
    this.expire = promisify(redisClient.expire).bind(redisClient);
  }

  async checkBlackList(userId, token) {
    await this.sadd(userId, token);
    await this.expire(userId, config.tokens.expiry.accessToken);
  }
}

module.exports = TokenRepository;
