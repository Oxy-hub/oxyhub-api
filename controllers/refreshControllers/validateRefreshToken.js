const tokenVerifier = require('../../utils/tokenVerifier');
const {
	findRefreshToken,
	deleteRefreshToken,
	findIsInitial,
} = require('../../utils/helpers/redisHelpers');
const {token} = require('morgan');
exports.validateRefreshToken = async (req, res, next) => {
	try {
		const {RTK} = req.cookies;
		// Try to verify the refresh token's validity
		const {jti, id} = tokenVerifier(RTK, 'REFRESH');

		//Check for the userid:jti key in redis, will return 0 if present, otherwise null
		const response = await findRefreshToken(id, jti);
		if (response !== '0') throw new Error('RTK missing in redis');

		//Deleting the corresponding userid:jti key in redis
		const del = await deleteRefreshToken(id, jti);
		if (del !== undefined) throw new Error('RTK failed to be deleted');

		// Try to find if user is set as an initial user in redis
		const isInitial = await findIsInitial(id);
		if (isInitial) {
			req.isInitial = true;
		} else {
			req.isInitial = false;
		}

		// Attach the user id to the req object for the generate token middleware
		req.user_id = id;
		console.log('Successfully validated the Refresh Token');
		next();
	} catch (err) {
		console.log('This is error from validateRefreshToken : ', err);
		res.sendStatus(401);
	}
};
