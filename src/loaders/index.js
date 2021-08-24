const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const redisLoader = require('./redis');

module.exports = async app => {
  console.log('Hello');
  await mongoLoader();
  redisLoader();
  expressLoader(app);
};
