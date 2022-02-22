const mockValidateRefreshTokenFromRedis = jest.fn();
const mockDeleteRefreshTokenFromRedis = jest.fn();

const mockTokenRepository = {
  TokenRepository: jest.fn().mockImplementation(() => ({
    createRefreshTokenInRedis: jest.fn(),
    validateRefreshTokenFromRedis: mockValidateRefreshTokenFromRedis,
    deleteRefreshTokenFromRedis: mockDeleteRefreshTokenFromRedis
  })),
  mockValidateRefreshTokenFromRedis,
  mockDeleteRefreshTokenFromRedis
};

module.exports = mockTokenRepository;
