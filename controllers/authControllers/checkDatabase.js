const User = require('../../models/user');

exports.checkDatabase = async (req, res, next) => {
	try {
		let user = await User.findOne({email: req.user.email}).exec();

		if (user) {
			console.log('User Exists in Database : ', user);
		} else {
			user = new User(req.user);
			await user.save();
		}

		req.isInitial = user.isInitial;
		req.user_id = user._id;

		next();
	} catch (err) {
		//Error message
		console.log('Error from checkDatabase', err);
		res.sendStatus(400);
	}
};
