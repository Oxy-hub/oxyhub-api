const { createClient } = require('redis');
const logger = require('./logger');
const config = require('../config');

module.exports = async () => {
  const client = createClient({
    socket: {
      host: config.redis.redisHostName,
      port: config.redis.redisPort
    },
    password: config.redis.redisPassword
  });

  try {
    await client.connect();
    logger.info('REDIS CLIENT IS READY!');
  } catch (e) {
    logger.error('REDIS CONNECTION FAILED! EXITING!');
    logger.error(e);
    process.exit();
  }

  return client;
};
