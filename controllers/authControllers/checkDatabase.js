const User = require('../../models/user');

exports.checkDatabase = async (req, res, next) => {
	try {
		const query = await User.findOne({email: req.user.email}).exec();

		if (query) {
			console.log('User Exists in Database : ', query);
			req.isInitial = query.isInitial;
			req.user_id = query._id;
		} else {
			const newUser = new User(req.user);
			await newUser.save();
			req.isInitial = newUser.isInitial;
			req.user_id = newUser._id;
		}

		next();
	} catch (err) {
		//Error message
		console.log('Error from checkDatabase', err);
		res.sendStatus(400);
	}
};
