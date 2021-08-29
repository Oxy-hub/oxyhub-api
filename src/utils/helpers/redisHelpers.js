// const { promisify } = require('util');
// const client = require('../db/redis');

// const set = promisify(client.set).bind(client);
// const get = promisify(client.get).bind(client);
// const del = promisify(client.del).bind(client);
// const sadd = promisify(client.sadd).bind(client);
// const smembers = promisify(client.smembers).bind(client);
// const expire = promisify(client.expire).bind(client);

// const constructKey = (userId, tokenId) => `${userId}:${tokenId}`;

// exports.storeRefreshToken = async (userId, tokenId) => {
//   await set(
//     constructKey(userId, tokenId),
//     0,
//     'EX',
//     process.env.REFRESH_TOKEN_EXPIRY_3D_MS
//   );
// };

// exports.findRefreshToken = async (userId, tokenId) => {
//   const response = await get(constructKey(userId, tokenId));
//   return response === '0';
// };

// exports.deleteRefreshToken = async (userId, tokenId) => {
//   await del(constructKey(userId, tokenId));
// };

// exports.setIsInitial = async userId => {
//   await set(`${userId}:initial`, true);
// };

// exports.deleteIsInitial = async userId => {
//   await del(`${userId}:initial`);
// };

// exports.findIsInitial = async userId => {
//   const response = await get(`${userId}:initial`);
//   return response;
// };

// exports.blacklistToken = async (userId, token) => {
//   await sadd(userId, token);
//   await expire(userId, process.env.ACCESS_TOKEN_EXPIRY_5M_MS);
// };

// exports.checkBlacklist = async (userId, token) => {
//   const response = await smembers(userId);
//   return response.includes(token);
// };
