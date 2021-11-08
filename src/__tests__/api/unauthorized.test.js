const request = require('supertest');
const express = require('express');
const redis = require('redis-mock');
const expressLoader = require('../../loaders/express');
const { awilixInit } = require('../../loaders/awilix');

let app = express();
const redisClient = redis.createClient();

beforeEach(() => {
  app = expressLoader(app, { swaggerSpec: {} });
  awilixInit({ redisClient });
});

describe('/users (Unauthorized)', () => {
  // test('GET to /user should return 401', async () => {
  //   const response = await request(app).get('/user');
  //   expect(response.statusCode).toBe(401);
  // });
  test('POST to /users should return 401', async () => {
    const response = await request(app).post('/api/v0/users');
    expect(response.statusCode).toBe(401);
  });
});
