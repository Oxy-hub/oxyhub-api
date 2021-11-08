const request = require('supertest');
const express = require('express');
const { awilixInit } = require('../../../loaders/awilix');
const expressLoader = require('../../../loaders/express');
const { authMiddleware } = require('../../../middlewares/auth');
const { mockReadUserById } = require('../../../repositories/UserRepository');

jest.mock('../../middlewares/auth');
jest.mock('../../repositories/UserRepository');
let app = express();

describe('GET /user', () => {
  beforeEach(() => {
    awilixInit({});
    app = expressLoader(app);
  });

  test('should return 200 if authenticated', async () => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(200);
  });

  test('should return 401 when userId is not present', async () => {
    authMiddleware.mockImplementationOnce((_, __, next) => {
      next();
    });
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(401);
  });

  test('should have application/json content-type header', async () => {
    const response = await request(app).get('/user');
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('should return user details', async () => {
    const response = await request(app).get('/user');
    expect(response.body.id).toBe('123abc');
    expect(response.body.firstName).toBe('John');
    expect(response.body.middleName).toBe('');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.email).toBe('johndoe@gmail.com');
  });

  test('should return 500 if database throws an error', async () => {
    mockReadUserById.mockImplementationOnce(() => Promise.reject());

    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Something went wrong!');
  });
});
