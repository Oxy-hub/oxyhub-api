const authResponseDto = res => ({
  access_token: res.accessToken,
  is_initial: res.isInitial,
  is_authenticated: res.isAuthenticated
});

module.exports = authResponseDto;
