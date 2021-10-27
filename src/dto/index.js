const authResponseDto = require('./authResponse');
const authRequestDto = require('./authRequest');

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
  authRequestDto
};
