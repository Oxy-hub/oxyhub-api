const authResponseDto = require('./authResponse');
const authRequestDto = require('./authRequest');
const registerUserRequestDto = require('./registerUserRequest');
const registerUserResponseDto = require('./registerUserResponse');

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
  registerUserRequestDto,
  registerUserResponseDto
};
