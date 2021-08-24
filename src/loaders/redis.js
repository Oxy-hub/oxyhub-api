const redis = require('redis');
const config = require('../config');

module.exports = () =>
  new Promise(resolve => {
    const client = redis.createClient({
      host: config.redis.redisHostName,
      port: config.redis.redisPort,
      password: config.redis.redisPassword
    });

    client.on('ready', () => {
      console.log('REDIS CLIENT IS READY!');
      resolve(client);
    });

    client.on('error', () => {
      console.log('REDIS CONNECTION FAILED! EXITING!');
      process.exit();
    });
  });
