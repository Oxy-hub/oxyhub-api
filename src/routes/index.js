const express = require('express');
const users = require('./users');
const auth = require('./auth');
const refresh = require('./refresh');

const init = router => {
  router.use('/auth', auth(express.Router()));
  router.use('/users', users(express.Router()));
  router.use('/refresh', refresh(express.Router()));
  return router;
};

module.exports = { init };
