const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/registerControllers');
const authController = require('../controllers/authControllers');

router.post('/', registerControllers.storeToDatabase, authController.generateTokens);

module.exports = router;
