const express = require('express');
const users = require('./users');
const auth = require('./auth');
const refresh = require('./refresh');
const districts = require('./districts');
const states = require('./states');
const parlours = require('./parlours');
const orders = require('./orders');
const logout = require('./logout');

const init = router => {
  router.use('/auth', auth(express.Router()));
  router.use('/users', users(express.Router()));
  router.use('/refresh', refresh(express.Router()));
  router.use('/districts', districts(express.Router()));
  router.use('/states', states(express.Router()));
  router.use('/parlours', parlours(express.Router()));
  router.use('/orders', orders(express.Router()));
  router.use('/logout', logout(express.Router()));
  return router;
};

module.exports = { init };
