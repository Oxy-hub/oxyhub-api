const request = require('supertest');
const express = require('express');
const expressLoader = require('../../loaders/express');

let app = express();
beforeAll(() => {
  app = expressLoader(app);
});

describe('Integration tests for /user(Unauthorized)', () => {
  test('GET to /user should return 401', async () => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(401);
  });
  test('POST to /user should return 401', async () => {
    const response = await request(app).post('/user');
    expect(response.statusCode).toBe(401);
  });
});
