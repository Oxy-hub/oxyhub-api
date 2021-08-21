const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken
} = require('./tokenGeneratorHelpers');

describe('Token Generators Unit Tests', () => {
  test('Test generateAccessToken', () => {
    const accessToken = generateAccessToken({
      payload: 'test'
    });
    const { payload } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      {
        audience: 'oxyhub-api',
        algorithm: 'HS256'
      }
    );
    expect(payload).toBe('test');
  });

  test('Test generateRefreshToken', () => {
    const refreshToken = generateRefreshToken({
      payload: 'test'
    });
    const { payload } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      {
        audience: 'oxyhub-api',
        algorithm: 'HS256'
      }
    );
    expect(payload).toBe('test');
  });
});
