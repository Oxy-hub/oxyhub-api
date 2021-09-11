const request = require('supertest');
const express = require('express');
const { awilixInit } = require('../../loaders/awilix');
const expressLoader = require('../../loaders/express');
const UserService = require('../../services/UserService');
const { authMiddleware } = require('../../middlewares/auth');

jest.mock('../../middlewares/auth');
jest.mock('../../services/UserService');
let app = express();
awilixInit({});

beforeAll(() => {
  app = expressLoader(app);
  UserService.mockImplementation(() => ({
    fetchUser: () => ({
      userId: '123abc',
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      email: 'johndoe@gmail.com'
    })
  }));
});

describe('GET /user', () => {
  test('should return 200 if authenticated', async () => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(200);
  });

  test('should return 401 when userId is not present', async () => {
    authMiddleware.mockImplementationOnce((req, res, next) => {
      next();
    });
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(401);
  });

  test('should have json type content-header', async () => {
    const response = await request(app).get('/user');

    expect(response.header['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('should get back user details', async () => {
    const user = {
      userId: '123abc',
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      email: 'johndoe@gmail.com'
    };
    const response = await request(app).get('/user');
    expect(response.body.userId).toBe(user.userId);
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.middleName).toBe(user.middleName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.email).toBe(user.email);
  });
});
