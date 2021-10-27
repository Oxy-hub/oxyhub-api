const authResponseDto = require('./authResponse');
const authRequestDto = require('./authRequest');

const createSuccessDto = (message, cb, metadata) => ({
  success: true,
  message,
  data: cb(),
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
