const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {
  let mongooseConnection = null;
  try {
    mongooseConnection = await mongoose.connect(config.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MONGODB CLIENT IS READY!');
  } catch (e) {
    logger.error('MONGO DB CONNECTION FAILED! EXITING!');
    logger.error(e);
    process.exit();
  }
  return mongooseConnection;
};
