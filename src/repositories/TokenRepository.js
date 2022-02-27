const { promisify } = require('util');
const config = require('../config');

class TokenRepository {
  constructor({ redisClient }) {
    this.redisClient = redisClient;
    this.set = promisify(redisClient.set).bind(redisClient);
    this.get = promisify(redisClient.get).bind(redisClient);
    this.del = promisify(redisClient.del).bind(redisClient);
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
      'PX',
      config.tokens.expiry.refreshToken
    );
  }

  async validateRefreshTokenFromRedis(userId, tokenId) {
    const response = await this.get(
      this.constructRefreshTokenKey(userId, tokenId)
    );
    if (!response || response !== '0') throw new Error();
  }

  async deleteRefreshTokenFromRedis(userId, tokenId) {
    await this.del(this.constructRefreshTokenKey(userId, tokenId));
  }

  async readBlackList(userId) {
    const response = await this.smembers(userId);
    return response;
  }
}

exports.TokenRepository = TokenRepository;
