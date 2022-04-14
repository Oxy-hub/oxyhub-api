const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const { redisInit } = require('./redis');
const { awilixInit } = require('./awilix');
const swaggerInit = require('./swagger');
// const logger = require('./logger');

module.exports = async app => {
  await mongoLoader();
  await redisInit();
  awilixInit();
  expressLoader(app, { swaggerSpec: swaggerInit() });
};
