const config = require('../config');

const getUserResponseDto = res => ({
  id: res.id,
  first_name: res.firstName,
  middle_name: res.middleName,
  last_name: res.lastName,
  email: res.email,
  orders_url: `${config.apiBaseUrl}/orders/${res.id}`
});

module.exports = getUserResponseDto;
