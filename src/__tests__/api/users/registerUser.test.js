const request = require('supertest');
const express = require('express');
const expressLoader = require('../../../loaders/express');
const { awilixInit } = require('../../../loaders/awilix');
const { authMiddleware } = require('../../../middlewares/auth');
const { mockCreateUser } = require('../../../repositories/UserRepository');

jest.mock('../../../repositories/UserRepository');
jest.mock('../../../repositories/TokenRepository');
jest.mock('../../../services/TokenService');
jest.mock('../../../middlewares/auth');
let app = express();
let response = null;
let responseData = null;

const userPostData = {
  first_name: 'John',
  middle_name: '',
  last_name: 'Doe'
};

beforeAll(() => {
  // Override the mock implementation of auth middleware for the initial user integration tests.
  authMiddleware.mockImplementation((req, _, next) => {
    req.isInitial = true;
    req.email = 'johndoe@oxyhub.com';
    next();
  });
  awilixInit({});
});

beforeEach(() => {
  app = expressLoader(app, { swaggerSpec: {} });
});

describe('POST /users (happy flow)', () => {
  beforeEach(async () => {
    response = await request(app)
      .post('/api/v0/users')
      .set('Content-Type', 'application/json')
      .send(userPostData);
    responseData = response.body.data;
  });

  test('should return 200 if authenticated', async () => {
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

  test('should return user details (which is persisted in the database)', async () => {
    expect(responseData.first_name).toBe('John');
    expect(responseData.middle_name).toBe('');
    expect(responseData.last_name).toBe('Doe');
    expect(responseData.email).toBe('johndoe@oxyhub.com');
    expect(responseData.profile_url).toBeTruthy();
  });
});

describe('POST /users (NOT so happy flow!)', () => {
  describe('Request DTO validation errors', () => {
    test('should return 400 if request dto is invalid', async () => {
      response = await request(app)
        .post('/api/v0/users')
        .set('Content-Type', 'application/json')
        .send();
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe('Input validation failed!');
      expect(response.body.error.errors.length).toBeGreaterThan(0);
    });

    // Add more test cases if possible
  });
  describe('Server Errors', () => {
    test('should return 500 if database throws an error', async () => {
      mockCreateUser.mockImplementationOnce(() => Promise.reject());
      response = await request(app)
        .post('/api/v0/users')
        .set('Content-Type', 'application/json')
        .send(userPostData);
      expect(response.statusCode).toBe(500);
      expect(response.body.error.message).toBe('Something went wrong!');
    });
  });
});
