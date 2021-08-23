const expressLoader = require('./express');
const mongoLoader = require('./mongo');
const redisLoader = require('./redis');

module.exports = async app => {
  await mongoLoader();
  redisLoader();
  expressLoader(app);
};
