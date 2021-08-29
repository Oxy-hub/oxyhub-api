const { promisify } = require('util');
const config = require('../config');

class TokenRepository {
  constructor({ redisClient }) {
    this.redisClient = redisClient;
    this.set = promisify(redisClient.set).bind(redisClient);
    this.sadd = promisify(redisClient.sadd).bind(redisClient);
    this.smembers = promisify(redisClient.smembers).bind(redisClient);
    this.expire = promisify(redisClient.expire).bind(redisClient);
  }

  constructRefreshTokenKey(userId, tokenId) {
    return `${userId}:${tokenId}`;
  }

  async createRefreshTokenInRedis(userId, tokenId) {
    await this.set(
      this.constructRefreshTokenKey(userId, tokenId),
      0,
      'EX',
      config.tokens.expiry.refreshToken
    );
  }

  async readBlackList(userId) {
    const response = await this.smembers(userId);
    return response;
  }
}

module.exports = TokenRepository;
