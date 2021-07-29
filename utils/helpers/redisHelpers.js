const {promisify} = require('util');
const client = require('../db/redis');

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
const del = promisify(client.del).bind(client);

const constructKey = (user_id, token_id) => {
	return `${user_id}:${token_id}`;
};

exports.storeRefreshToken = async (user_id, token_id) => {
	await set(
		constructKey(user_id, token_id),
		0,
		'EX',
		process.env.REFRESH_TOKEN_EXPIRY_3D_MS
	);
};

exports.findRefreshToken = async (user_id, token_id) => {
	const response = await get(constructKey(user_id, token_id));
	return response === '0' ? true : false;
};

exports.deleteRefreshToken = async (user_id, token_id) => {
	const response = await del(constructKey(user_id, token_id));
	return response === '1' ? 'Success' : null;
};

exports.setIsInitial = async user_id => {
	await set(`${user_id}:initial`, true);
};

exports.findIsInitial = async user_id => {
	const response = await get(`${user_id}:initial`);
	return response ? true : false;
};
