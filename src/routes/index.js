const express = require('express');
const user = require('./user');
const auth = require('./auth');

const init = app => {
  app.use('/auth', auth(express.Router()));
  app.use('/user', user(express.Router()));
};

module.exports = { init };
