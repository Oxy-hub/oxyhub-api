const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/registerControllers');
const authController = require('../controllers/authControllers');

router.get('/', registerControllers.storeToDatabase);

module.exports = router;
