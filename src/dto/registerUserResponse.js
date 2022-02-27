const config = require('../config');

const registerUserResponseDto = res => ({
  access_token: res.accessToken,
  first_name: res.persistanceObj.firstName,
  middle_name: res.persistanceObj.middleName,
  last_name: res.persistanceObj.lastName,
  email: res.persistanceObj.email,
  profile_url: `${config.apiBaseUrl}/users/me`
});

module.exports = registerUserResponseDto;
