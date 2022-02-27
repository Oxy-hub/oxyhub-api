const { Container } = require('../loaders/awilix');
const AppError = require('../errors/AppError');

exports.authMiddleware = async (req, res, next) => {
  try {
    // console.log('executing auth middleware...');
    // Extract access token from header in request object
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const TokenService = Container.resolve('tokenService');
    const data = await TokenService.verifyAccessToken(accessToken);

    // Attach isInitial status and email to request object
    req.isInitial = data.isInitial;
    req.email = data.email;

    // Dummy data for manual testing
    // req.isInitial = true;
    // req.email = 'sabyasachi.tffs@gmail.com';

    // Attach user id to the request object
    req.userId = data.id;
    next();
  } catch (err) {
    next(AppError.unauthorized());
  }
};
