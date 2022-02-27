const { Container } = require('../../loaders/awilix');
const config = require('../../config');
const { createSuccessDto, registerUserResponseDto } = require('../../dto');

exports.registerUser = async (req, res) => {
  const { email, isInitial } = req;

  const UserService = Container.resolve('userService');
  const TokenService = Container.resolve('tokenService');

  // Send isInitial to User service for checking along with req body and email from access token
  const response = await UserService.register(isInitial, {
    email,
    ...req.body
  });

  // Generate new access and refresh tokens to be sent back
  const accessToken = TokenService.generateAccessToken(response.id, {
    isInitial: false
  });
  const refreshToken = TokenService.generateRefreshToken(response.id);

  return res
    .cookie('RTK', refreshToken, {
      httpOnly: true,
      maxAge: config.tokens.expiry.refreshToken,
      secure: true
    })
    .send(
      createSuccessDto(
        'User successfully registered!',
        registerUserResponseDto({
          accessToken,
          persistanceObj: response
        })
      )
    );
};
