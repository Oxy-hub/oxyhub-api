const authResponseDto = require('./authResponse');
const authRequestDto = require('./authRequest');
const getUserResponseDto = require('./getUserResponse');
const registerUserRequestDto = require('./registerUserRequest');
const registerUserResponseDto = require('./registerUserResponse');
const refreshResponseDto = require('./refreshResponse');

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
  authResponseDto,
  authRequestDto,
  getUserResponseDto,
  registerUserRequestDto,
  registerUserResponseDto,
  refreshResponseDto
};
