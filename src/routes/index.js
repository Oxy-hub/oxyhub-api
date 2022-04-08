const express = require('express');
const users = require('./users');
const auth = require('./auth');
const refresh = require('./refresh');
const districts = require('./districts');
const states = require('./states');

const init = router => {
  router.use('/auth', auth(express.Router()));
  router.use('/users', users(express.Router()));
  router.use('/refresh', refresh(express.Router()));
  router.use('/districts', districts(express.Router()));
  router.use('/states', states(express.Router()));
  return router;
};

module.exports = { init };
