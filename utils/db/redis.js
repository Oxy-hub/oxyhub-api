const redis = require('redis');
const client = redis.createClient();

client.on('ready', () => {
	console.log('REDIS CLIENT IS READY!');
});

client.on('error', err => {
	// console.log(err);
	console.log('REDIS CONNECTION FAILED! TRY AGAIN!');
});

module.exports = client;
