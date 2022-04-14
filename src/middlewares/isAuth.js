const { Container } = require('../loaders/awilix');
const AppError = require('../errors/AppError');

module.exports = async (req, res, next) => {
  try {
    /** A boolean flag by the name of partialAuth will be attached by the previous middleware, if the route does not need to be authenticated if Authorization header is NOT present */
    if (req.isOptionalAuth && !req.headers.authorization) {
      return next();
    }

    // Extract access token from header in request object
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const AuthService = Container.resolve('authService');
    const { data, id } = await AuthService.verifyAccessToken(accessToken);

    // If isInitial is true then access to this API is prohibited
    if (data.isInitial) {
      throw new AppError(401, 'Unauthorized request!', [
        'Access to this API is not allowed with this access token'
      ]);
    }

    // Attach isInitial status, and additional data to the req object
    req.userId = id;
    req.tokenData = { ...data };

    return next();
  } catch (err) {
    return next(err);
  }
};
