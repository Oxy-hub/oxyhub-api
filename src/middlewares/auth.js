const { Container } = require('../loaders/awilix');
const AppError = require('../errors/AppError');

exports.authMiddleware = async (req, res, next) => {
  try {
    // Extract access token from header in request object
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const AuthService = Container.resolve('authService');
    const { data, id } = await AuthService.verifyAccessToken(accessToken);

    // If isInitial is false and id is also null, then a wrong access token is being sent
    if (!data.isInitial && id === null)
      throw new AppError(401, 'Unauthorized request!', [
        'Access to this API is not allowed with this access token'
      ]);

    // Attach isInitial status, and additional data to the req object
    req.userId = id;
    req.tokenData = { ...data };

    next();
  } catch (err) {
    next(err);
  }
};
