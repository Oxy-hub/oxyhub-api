const mockGenerateAccessToken = jest
  .fn()
  .mockImplementation(() => 'superSecretAccessToken');

const mockGenerateRefreshToken = jest
  .fn()
  .mockImplementation(() => 'superSecretRefreshToken');

const mockTokenService = {
  TokenService: jest.fn().mockImplementation(() => ({
    generateAccessToken: mockGenerateAccessToken,
    generateRefreshToken: mockGenerateRefreshToken
  }))
};

module.exports = mockTokenService;
