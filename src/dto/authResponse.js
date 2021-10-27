const authResponseDto = res => ({
  access_token: res.accessToken,
  is_initial: res.isInitial,
  is_authenticated: res.isAuthenticated,
  user: res.userProfile
    ? {
        first_name: res.userProfile.firstName,
        middle_name: res.userProfile.middleName,
        last_name: res.userProfile.lastName,
        email: res.userProfile.email
      }
    : null
});

module.exports = authResponseDto;
