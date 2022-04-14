const config = require('../config');

class TokenRepository {
  constructor({ redisClient }) {
    this.redisClient = redisClient;
  }

  async storeRefreshToken(token, expiry) {
    await this.redisClient.set(token, 0, {
      PX: expiry
    });
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
