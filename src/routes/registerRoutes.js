const express = require('express');

const router = express.Router();
const registerControllers = require('../controllers/registerControllers');

router.get('/', registerControllers.storeToDatabase);

module.exports = router;
