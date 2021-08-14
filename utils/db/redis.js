const redis = require('redis');
const client = redis.createClient({
	host: process.env.REDIS_HOSTNAME,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PASSWORD,
});

client.on('ready', () => {
	console.log('REDIS CLIENT IS READY!');
});

client.on('error', err => {
	// console.log(err);
	console.log('REDIS CONNECTION FAILED! TRY AGAIN!');
});

module.exports = client;
