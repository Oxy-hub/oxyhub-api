const express = require('express');
const registerControllers = require('../controllers/register');

const router = express.Router();

module.exports = app => {
  router.post('/', registerControllers.registerUser);

  app.use(router);
};
