const request = require('supertest');
const express = require('express');
const config = require('../../../config');
const { awilixInit } = require('../../../loaders/awilix');
const expressLoader = require('../../../loaders/express');
const { mockReadUserById } = require('../../../repositories/UserRepository');

jest.mock('../../../middlewares/auth');
jest.mock('../../../repositories/UserRepository');

let app = express();
let response = null;
let responseData = null;

beforeAll(() => {
  awilixInit({});
});

beforeEach(() => {
  app = expressLoader(app, { swaggerSpec: {} });
});

describe('GET /users/me (happy flow)', () => {
  beforeEach(async () => {
    response = await request(app).get('/api/v0/users/me');
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

  test('should return user details', async () => {
    expect(responseData).toStrictEqual({
      id: '123abc',
      first_name: 'John',
      middle_name: 'Pastor',
      last_name: 'Doe',
      email: 'johndoe@gmail.com',
      orders_url: `${config.apiBaseUrl}/orders/123abc`
    });
  });
});

describe('POST /users (NOT so happy flow!)', () => {
  describe('Server Errors', () => {
    test('should return 500 if database throws an error', async () => {
      mockReadUserById.mockImplementationOnce(() => Promise.reject());
      response = await request(app).get('/api/v0/users/me');
      expect(response.statusCode).toBe(500);
      expect(response.body.error.message).toBe('Something went wrong!');
      expect(response.body.error.httpStatus).toBe(500);
    });
  });
});
