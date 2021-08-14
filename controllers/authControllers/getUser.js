const axios = require('axios');

//call to get back the user
const getUserAccount = access_token => {
	return axios.get('https://api.github.com/user', {
		headers: {Authorization: `token ${access_token}`},
	});
};

//call to get back the user email
const getUserEmail = access_token => {
	return axios.get('https://api.github.com/user/emails', {
		headers: {Authorization: `token ${access_token}`},
	});
};

exports.getUser = async (req, res, next) => {
	try {
		const access_token = req.access_token;
		const [user, email] = await Promise.all([
			getUserAccount(access_token),
			getUserEmail(access_token),
		]);

		if (!email.data[0].verified) throw new Error();

		const name = user.data.name.split(' ');
		const first_name = name[0];
		const last_name = name[name.length - 1];
		const middle_name = name.splice(1, name.length - 2).join(' ');

		req.user = {
			first_name,
			middle_name,
			last_name,
			email: email.data[0].email,
		};

		console.log('User from Github', req.user);
		next();
	} catch (err) {
		console.log('This is error during fetching user data : ', err);
		res.sendStatus(400);
	}
};
