const request = require('supertest');
const express = require('express');
const awilix = require('awilix');
const { TokenService } = require('../../../services/TokenService');
const { TokenRepository } = require('../../../repositories/TokenRepository');
const expressLoader = require('../../../loaders/express');
const { Container } = require('../../../loaders/awilix');

jest.mock('../../../repositories/TokenRepository');

// jest.mock('../../../services/TokenService');
// jest.mock('.../../../services/TokenService', () => ({
//   TokenService: jest.fn().mockImplementation(() => ({
//     generateRefreshToken: jest.fn(() => {

//     }),
//     verify: jest.fn(() => {

//     })
//   }))
// }));

let app = express();
let response = null;
let responseData = null;

beforeAll(() => {
  const TokenServiceInstance = new TokenService({
    tokenRepository: TokenRepository
  });

  jest
    .spyOn(TokenServiceInstance, 'generateRefreshToken')
    .mockImplementation(() => {});

  jest.spyOn(TokenServiceInstance, 'verify').mockImplementation(() => {});

  Container.register({
    tokenService: awilix.asValue(TokenServiceInstance),
    tokenRepository: awilix.asClass(TokenRepository)
  });
});

beforeEach(() => {
  app = expressLoader(app, { swaggerSpec: {} });
});

describe('GET /refresh (happy flow)', () => {
  beforeEach(async () => {
    response = await request(app)
      .get('/api/v0/refresh')
      .set('Cookie', 'RTK=abc123');
    responseData = response.body.data;
  });

  test('should return 200 if refresh token is valid', async () => {
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(responseData).toBeTruthy();
  });

  test('should have application/json content-type header', async () => {
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('should return valid access_token', async () => {
    expect(responseData.access_token).toBe('superSecretAccessToken');
  });

  test('should return valid refresh_token', async () => {
    let refreshToken = response.headers['set-cookie'][0];
    refreshToken = refreshToken.split('; ');
    expect(refreshToken[0]).toBe('RTK=superSecretRefreshToken');
    expect(refreshToken[1]).toBe('Max-Age=259200');
    expect(refreshToken[4]).toBe('HttpOnly');
    expect(refreshToken[5]).toBe('Secure');
  });
});

// describe('POST /users (NOT so happy flow!)', () => {
//   describe('Request DTO validation errors', () => {
//     test('should return 400 if request dto is invalid', async () => {
//       response = await request(app)
//         .post('/api/v0/users')
//         .set('Content-Type', 'application/json')
//         .send();
//       expect(response.statusCode).toBe(400);
//       expect(response.body.error.message).toBe('Input validation failed!');
//       expect(response.body.error.errors.length).toBeGreaterThan(0);
//     });

//     // Add more test cases if possible
//   });
//   describe('Server Errors', () => {
//     test('should return 500 if database throws an error', async () => {
//       mockCreateUser.mockImplementationOnce(() => Promise.reject());
//       response = await request(app)
//         .post('/api/v0/users')
//         .set('Content-Type', 'application/json')
//         .send(userPostData);
//       expect(response.statusCode).toBe(500);
//       expect(response.body.error.message).toBe('Something went wrong!');
//     });
//   });
// });
