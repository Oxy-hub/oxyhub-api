class TokenRepository {
  constructor({ redisClient }) {
    this.redisClient = redisClient;
  }

  async storeRefreshToken(token, expiry) {
    await this.redisClient.set(token, 1, {
      PX: expiry
    });
  }

  async readRefreshToken(key) {
    const response = await this.redisClient.get(key);
    return response;
  }

  async deleteRefreshToken(key) {
    await this.redisClient.del(key);
  }
}

exports.TokenRepository = TokenRepository;
