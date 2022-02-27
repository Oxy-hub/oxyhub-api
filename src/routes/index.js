const express = require('express');
const users = require('./users');
const auth = require('./auth');

const init = router => {
  router.use('/auth', auth(express.Router()));
  router.use('/users', users(express.Router()));
  return router;
};

module.exports = { init };
