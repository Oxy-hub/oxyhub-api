const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const redisLoader = require('./redis');
const { awilixInit } = require('./awilix');
const swaggerInit = require('./swagger');
// const logger = require('./logger');

module.exports = async app => {
  await mongoLoader();
  const redisClient = await redisLoader();
  // logger.debug(`Redis Client loaders index : ${redisClient}`);
  // console.log('Redis Client loaders index : ', redisClient);
  awilixInit({ redisClient });
  const swaggerSpec = swaggerInit();
  console.log(swaggerSpec);
  expressLoader(app, { swaggerSpec: swaggerInit() });
};
