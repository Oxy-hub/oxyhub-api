const {
	generateAccessToken,
	generateRefreshToken,
} = require('../../utils/tokenGenerator');
exports.generateTokens = (req, res, next) => {
	//Access token generation using jsonwebtoken
	const accessToken = generateAccessToken(req.user);

	//Refresh token generation using jsonwebtoken
	const refreshToken = generateRefreshToken(req.user);

	//Sending back HTTPonly cookie in response object
	res.cookie('ATK', accessToken, {httpOnly: true, secure: true});
	res.cookie('RTK', refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
		secure: true,
	});
	console.log('user as payload', req.user);
	res.send(req.user);
};
