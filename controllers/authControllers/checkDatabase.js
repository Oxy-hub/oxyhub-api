const User = require('../../models/user');

exports.checkDatabase = async (req, res, next) => {
	try {
		const query = await User.findOne({phone_number: req.phoneNumber}).exec();

		if (query) {
			console.log('query', query);
			req.user = {
				phone_number: query.phone_number,
				first_name: query.first_name,
				last_name: query.last_name,
				id_type: query.id_type,
				id_number: query.id_number,
			};
		} else {
			const newUser = new User({phone_number: req.phoneNumber});
			await newUser.save();
			req.user = newUser.phone_number;
		}

		next();
	} catch (err) {
		//Error message
		console.log('Error from checkDatabase', err);
		res.sendStatus(400);
	}
};
