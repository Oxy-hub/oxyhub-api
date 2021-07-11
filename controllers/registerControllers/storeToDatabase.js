module.exports = (req, res, next) => {
	try {
		if (!req.user && !req.user.id_number === undefined) {
			throw new Error();
		}
		const {} = req.body;
	} catch (e) {
		console.log(e);
		res.sendStatus(400);
	}
};
