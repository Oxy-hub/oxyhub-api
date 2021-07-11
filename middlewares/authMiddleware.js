const tokenVerifier = require('../utils/tokenVerifier');
const authMiddleware = (req, res, next) => {
	try {
		const {ATK: accessToken} = req.cookies;
		const payload = tokenVerifier(accessToken, 'ACCESS');
		req.user = payload;
		next();
	} catch (err) {
		//error message
		console.log('Authorization Failed');
		console.log(err);
		res.sendStatus(401);
	}
};

module.exports = authMiddleware;
