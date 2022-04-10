const { Container } = require('../../loaders/awilix');
// const AppError = require('../../errors/AppError');

exports.googleLogin = async (req, res) => {
  const { code } = req.body;

  const AuthService = Container.resolve('authService');

  // Resolve user profile from Github and try to login
  await AuthService.useGoogleOAuth(code);
  res.send(200);
  // const { isInitial, userId } = await AuthService.login(userProfile);

  // // If user is initial, do not set refresh token in the cookie, but send the user profile
  // if (isInitial) {
  //   const accessToken = AuthService.generateAccessToken(userId, {
  //     isInitial: true,
  //     email: userProfile.email
  //   });
  //   return res.send(
  //     createSuccessDto(
  //       'New user. Please complete registration!',
  //       authResponseDto({
  //         accessToken,
  //         isInitial,
  //         isAuthenticated: !isInitial,
  //         userProfile
  //       })
  //     )
  //   );
  // }

  // const accessToken = AuthService.generateAccessToken(userId, {
  //   isInitial: false
  // });
  // const refreshToken = AuthService.generateRefreshToken(userId);

  // return res
  //   .cookie('RTK', refreshToken, {
  //     httpOnly: true,
  //     maxAge: config.tokens.expiry.refreshToken,
  //     secure: true
  //   })
  //   .send(
  //     createSuccessDto(
  //       'User logged in successfully!',
  //       authResponseDto({
  //         accessToken,
  //         isInitial,
  //         isAuthenticated: !isInitial
  //       })
  //     )
  //   );
};
