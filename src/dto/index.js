const authDtos = require('./auth');
const refreshDtos = require('./refresh');
const stateDtos = require('./states');
const districtDtos = require('./districts');
const parlourDtos = require('./parlours');
const orderDtos = require('./orders');
const userDtos = require('./users');
const itemDtos = require('./items');

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

  auth: {
    ...authDtos
  },
  refresh: {
    ...refreshDtos
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
  },
  items: {
    ...itemDtos
  }
};
