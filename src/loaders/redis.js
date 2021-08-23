const redis = require('redis');
const config = require('../config');

module.exports = async () => {
  const client = redis.createClient({
    host: config.redis.redisHostName,
    port: config.redis.redisPort,
    password: config.redis.redisPassword
  });

  client.on('ready', () => {
    console.log('REDIS CLIENT IS READY!');
  });

  client.on('error', () => {
    console.log('REDIS CONNECTION FAILED! EXITING!');
    process.exit();
  });
};
