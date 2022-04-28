const { Container } = require('../../loaders/awilix');
const config = require('../../config');
const { createSuccessDto, auth: authDtos } = require('../../dto');

exports.oAuthLogin = async (req, res) => {
  const { code, provider } = req.body;

  const AuthService = Container.resolve('authService');

  // Resolve user profile from an OAuth Provider and try to login
  const userProfile = await AuthService.fetchProfile(code, provider);
  const { isInitial, userId } = await AuthService.login(userProfile);

  // If user is initial, do not set refresh token in the cookie, but send the user profile
  if (isInitial) {
    const accessToken = AuthService.generateAccessToken(userId, {
      isInitial: true,
      email: userProfile.email,
      avatar: userProfile.avatar
    });
    return res.send(
      createSuccessDto(
        'New user. Please complete registration!',
        authDtos.postResponse({
          accessToken,
          isInitial,
          isAuthenticated: !isInitial,
          userProfile
        })
      )
    );
  }

  const accessToken = AuthService.generateAccessToken(userId, {
    isInitial: false
  });
  const refreshToken = await AuthService.generateRefreshToken(userId);

  return res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true,
      sameSite: 'none'
    })
    .send(
      createSuccessDto(
        'User logged in successfully!',
        authDtos.postResponse({
          accessToken,
          isInitial,
          isAuthenticated: !isInitial
        })
      )
    );
};
