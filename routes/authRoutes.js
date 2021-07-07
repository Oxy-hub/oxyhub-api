const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// console.log('controller', authControllers);
router.post(
  '/',
  authControllers.idTokenVerification,
  authControllers.checkDatabase,
  authControllers.generateTokens
);

module.exports = router;
