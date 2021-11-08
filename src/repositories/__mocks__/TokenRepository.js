const mockTokenRepository = {
  TokenRepository: jest.fn().mockImplementation(() => ({
    createRefreshTokenInRedis: jest.fn()
  }))
};

module.exports = mockTokenRepository;
