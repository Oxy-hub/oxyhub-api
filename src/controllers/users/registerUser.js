const { Container } = require('../../loaders/awilix');
const config = require('../../config');
const { createSuccessDto, users: usersDtos } = require('../../dto');

exports.registerUser = async (req, res) => {
  const { email, isInitial, avatar } = req.tokenData;

  const UserService = Container.resolve('userService');
  const AuthService = Container.resolve('authService');

  // Send isInitial to User service for checking along with req body and email from access token
  const response = await UserService.registerUser(isInitial, {
    email,
    avatar,
    ...req.body
  });

  // Generate new access and refresh tokens to be sent back
  const accessToken = AuthService.generateAccessToken(response.id, {
    isInitial: false
  });
  const refreshToken = await AuthService.generateRefreshToken(response.id);

  return res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true
    })
    .send(
      createSuccessDto(
        'User successfully registered!',
        usersDtos.postResponse({
          accessToken,
          persistanceObj: response
        })
      )
    );
};
