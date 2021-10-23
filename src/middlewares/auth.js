// const tokenVerifier = require('../utils/helpers/tokenVerifierHelper');
// const {
//   findIsInitial,
//   checkBlacklist
// } = require('../utils/helpers/redisHelpers');
const { Container } = require('../loaders/awilix');

exports.authMiddleware = async (req, res, next) => {
  try {
    console.log('executing auth middleware...');
    // Extract access token from header in request object
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const TokenService = Container.resolve('tokenService');
    const { id, isInitial } = TokenService.verifyAccessToken(accessToken);

    // Attach isInitial status  to request object
    req.isInitial = isInitial;

    // Attach user id to the request object
    req.userId = id;
    next();
  } catch (err) {
    console.log('Authorization Failed');
    console.log(err);
    res.sendStatus(401);
  }
};

// module.exports = authMiddleware;
