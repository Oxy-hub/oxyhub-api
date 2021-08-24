const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const redisLoader = require('./redis');
const { awilixInit } = require('./awilix');

module.exports = async app => {
  await mongoLoader();
  const redisClient = await redisLoader();
  awilixInit(redisClient);
  expressLoader(app);
};
