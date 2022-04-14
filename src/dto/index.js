const getUserResponseDto = require('./getUserResponse');
const registerUserRequestDto = require('./registerUserRequest');
const registerUserResponseDto = require('./registerUserResponse');
const refreshResponseDto = require('./refreshResponse');
const authDtos = require('./auth');
const stateDtos = require('./states');
const districtDtos = require('./districts');
const parlourDtos = require('./parlours');
const orderDtos = require('./orders');

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
  registerUserRequestDto,
  registerUserResponseDto,
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
  }
};
