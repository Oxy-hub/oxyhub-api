const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const redisLoader = require('./redis');
const { awilixInit } = require('./awilix');
// const logger = require('./logger');

module.exports = async app => {
  await mongoLoader();
  const redisClient = await redisLoader();
  // logger.debug(`Redis Client loaders index : ${redisClient}`);
  // console.log('Redis Client loaders index : ', redisClient);
  awilixInit({ redisClient });
  expressLoader(app);
};
