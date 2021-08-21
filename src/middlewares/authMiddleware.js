const tokenVerifier = require('../utils/helpers/tokenVerifierHelper');
const {
  findIsInitial,
  checkBlacklist
} = require('../utils/helpers/redisHelpers');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];

    // Verify whether access_token is valid or not
    const { id } = tokenVerifier(accessToken, 'ACCESS');

    // Check whether access_token is in redis blacklist
    const blacklistedToken = await checkBlacklist(id, accessToken);
    if (blacklistedToken) throw new Error('You Are Blocked!');

    // Get isInitial from redis
    req.isInitial = await findIsInitial(id);

    // Attach user id to the request object
    req.user_id = id;

    console.log('Authorization Successful');
    next();
  } catch (err) {
    console.log('Authorization Failed');
    console.log(err);
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
