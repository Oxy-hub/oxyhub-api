const tokenVerifier = require('../utils/tokenVerifier');
const {findIsInitial} = require('../utils/helpers/redisHelpers');
const authMiddleware = async (req, res, next) => {
	try {
		const {authorization} = req.headers;
		const access_token = authorization.split(' ')[1];

		// Verify whether access_token is valid or not
		const {id} = await tokenVerifier(access_token, 'ACCESS');

		// Check whether access_token is in redis blacklist

		// Get isInitial from redis
		const isInitial = (await findIsInitial(id)) ? true : false;

		// Attach user id and isInitial to the request object
		req.user_id = id;
		req.isInitial = isInitial;

		console.log('Authorization Successful');
		next();
	} catch (err) {
		console.log('Authorization Failed');
		console.log(err);
		res.sendStatus(401);
	}
};

module.exports = authMiddleware;
