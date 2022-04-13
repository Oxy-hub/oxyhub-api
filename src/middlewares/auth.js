const { Container } = require('../loaders/awilix');

exports.authMiddleware = async (req, res, next) => {
  try {
    // Extract access token from header in request object
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const AuthService = Container.resolve('authService');
    const data = await AuthService.verifyAccessToken(accessToken);

    // Attach isInitial status, email and userId to request object
    req.isInitial = data.isInitial;
    req.email = data.email;
    req.userId = data.id;

    // Implement the profile image url here
    // req.token_data = data.info;

    next();
  } catch (err) {
    next(err);
  }
};
