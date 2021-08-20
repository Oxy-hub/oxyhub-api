const express = require('express');
const router = express.Router();
const refreshControllers = require('../controllers/refreshControllers');
const authControllers = require('../controllers/authControllers');
router.get(
  '/',
  refreshControllers.validateRefreshToken,
  authControllers.generateTokens
);

module.exports = router;
