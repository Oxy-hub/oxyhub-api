const jwt = require('jsonwebtoken');
const tokenVerifier = require('./tokenVerifierHelper');

describe('Token Verifier Unit Tests', () => {
  test('Test verifyAccessToken', () => {
    const accessToken = jwt.sign(
      {
        payload: 'test'
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY_5M_MS,
        audience: 'oxyhub-api',
        algorithm: 'HS256'
      }
    );
    const { payload } = tokenVerifier(accessToken, 'ACCESS');
    expect(payload).toBe('test');
  });

  test('Test verifyRefrshToken', () => {
    const refreshToken = jwt.sign(
      {
        payload: 'test'
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY_3D_MS,
        audience: 'oxyhub-api',
        algorithm: 'HS256'
      }
    );
    const { payload } = tokenVerifier(refreshToken, 'REFRESH');
    expect(payload).toBe('test');
  });

  test('verify token with no option should throw error', () => {
    const refreshToken = jwt.sign(
      {
        payload: 'test'
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY_3D_MS,
        audience: 'oxyhub-api',
        algorithm: 'HS256'
      }
    );
    expect(() => {
      tokenVerifier(refreshToken);
    }).toThrow(Error);
  });
});
