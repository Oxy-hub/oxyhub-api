const express = require('express');
const router = express.Router();
const logoutControllers = require('../controllers/logoutControllers');
router.get('/', logoutControllers.logoutUser);

module.exports = router;
