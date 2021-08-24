const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const redisLoader = require('./redis');
const { awilixLoader } = require('./awilix');

module.exports = async app => {
  console.log('Hello');
  await mongoLoader();
  const redisClient = redisLoader();
  awilixLoader(redisClient);
  expressLoader(app);
};
