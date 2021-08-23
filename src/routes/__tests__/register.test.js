const request = require('supertest');
const express = require('express');
const server = require('../../loaders/express');

let app;
beforeAll(() => {
  app = server(express());
});

describe('POST /register', () => {
  test('should return 401 for unauthenticated users', async () => {
    const response = await request(app).post('/register');
    expect(response.statusCode).toBe(401);
  });

  // test('should return 200 for new user', async () => {
  //   const response = await request(app).post('/register').send({
  //     firstName: 'Test',
  //     middleName: 'Middle',
  //     lastName: 'User'
  //   });
  //   expect(response.statusCode).toBe(200);
  // });

  // test('should return 400 if user is not initial', async () => {
  //   const response = await request(app).post('/register').send({
  //     firstName: 'Test',
  //     middleName: 'Middle',
  //     lastName: 'User'
  //   });
  //   expect(response.statusCode).toBe(400);
  // });

  // test('should return 400 with no firstName in body', async () => {
  //   const response = await request(app).post('/register').send({
  //     lastName: 'User'
  //   });
  //   expect(response.statusCode).toBe(400);
  // });

  // test('should return 400 with empty firstName in body', async () => {
  //   const response = await request(app).post('/register').send({
  //     firstName: ' '
  //   });
  //   expect(response.statusCode).toBe(400);
  // });

  // test('should return 400 with no lastName in body', async () => {
  //   const response = await request(app).post('/register').send({
  //     firstName: 'Test'
  //   });
  //   expect(response.statusCode).toBe(400);
  // });

  // test('should return 400 with empty lastName in body', async () => {
  //   const response = await request(app).post('/register').send({
  //     lastName: ' '
  //   });
  //   expect(response.statusCode).toBe(400);
  // });

  // test('should return 400 if body is empty', async () => {
  //   const response = await request(app).post('/register').send({});
  //   expect(response.statusCode).toBe(400);
  // });

  // test('should return 400 if firstName and lastName both are empty', async () => {
  //   const response = await request(app).post('/register').send({
  //     firstName: ' ',
  //     lastName: ' '
  //   });
  //   expect(response.statusCode).toBe(400);
  // });
});
