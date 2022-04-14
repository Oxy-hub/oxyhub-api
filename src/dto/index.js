const getUserResponseDto = require('./getUserResponse');
const refreshResponseDto = require('./refreshResponse');
const authDtos = require('./auth');
const stateDtos = require('./states');
const districtDtos = require('./districts');
const parlourDtos = require('./parlours');
const orderDtos = require('./orders');
const userDtos = require('./users');

const createSuccessDto = (message, data, metadata) => ({
  success: true,
  message,
  data,
  metadata
});

const createErrorDto = (error, metadata) => ({
  success: false,
  error,
  metadata
});

module.exports = {
  createSuccessDto,
  createErrorDto,
  getUserResponseDto,
  refreshResponseDto,

  auth: {
    ...authDtos
  },
  states: {
    ...stateDtos
  },
  districts: {
    ...districtDtos
  },
  parlours: {
    ...parlourDtos
  },
  orders: {
    ...orderDtos
  },
  users: {
    ...userDtos
  }
};
