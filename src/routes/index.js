const express = require('express');
const register = require('./register');
// const auth = require('./auth');

const router = express.Router();

const init = app => {
  // app.use('/auth', auth(router));
  app.use('/register', register(router));
};

module.exports = { init };
