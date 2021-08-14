const User = require('../../models/user');
const {
	setIsInitial,
	deleteIsInitial,
} = require('../../utils/helpers/redisHelpers');
exports.checkDatabase = async (req, res, next) => {
	try {
		let user = await User.findOne({email: req.user.email}).exec();

		// Store the user in the database if the user does not exist in the db
		if (!user) {
			user = new User(req.user);
			await user.save();
		}

		// Attach the isInitial and the user id to the req object
		req.isInitial = user.isInitial;
		req.user_id = user._id;

		//Store userid:inital key in redis(if true otherwise delete) to prevent further database lookups during refresh
		user.isInitial
			? await setIsInitial(user._id)
			: await deleteIsInitial(user._id);

		next();
	} catch (err) {
		//Error message
		console.log('Error from checkDatabase', err);
		res.sendStatus(400);
	}
};
