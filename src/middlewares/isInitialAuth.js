const { Container } = require('../loaders/awilix');
const AppError = require('../errors/AppError');

module.exports = async (req, res, next) => {
  try {
    // Extract access token from header in request object
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const AuthService = Container.resolve('authService');
    const { data } = await AuthService.verifyAccessToken(accessToken);

    // If isInital is false, then access to this API using this token is prohibited
    if (!data.isInitial) {
      throw new AppError(401, 'Unauthorized request!', [
        'Access to this API is not allowed with this access token'
      ]);
    }

    // Attach the token data to the request object
    req.tokenData = { ...data };

    return next();
  } catch (err) {
    return next(err);
  }
};
