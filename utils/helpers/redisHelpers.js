const { promisify } = require('util');
const client = require('../db/redis');

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
const del = promisify(client.del).bind(client);
const sadd = promisify(client.sadd).bind(client);
const expire = promisify(client.expire).bind(client);

const constructKey = (user_id, token_id) => {
  return `${user_id}:${token_id}`;
};

exports.storeRefreshToken = async (user_id, token_id) => {
  await set(constructKey(user_id, token_id), 0, 'EX', process.env.REFRESH_TOKEN_EXPIRY_3D_MS);
};

exports.findRefreshToken = async (user_id, token_id) => {
  const response = await get(constructKey(user_id, token_id));
  return response === '0' ? true : false;
};

exports.deleteRefreshToken = async (user_id, token_id) => {
  await del(constructKey(user_id, token_id));
};

exports.setIsInitial = async user_id => {
  await set(`${user_id}:initial`, true);
};

exports.deleteIsInitial = async user_id => {
  await del(`${user_id}:initial`, true);
};

exports.findIsInitial = async user_id => {
  const response = await get(`${user_id}:initial`);
  return response ? true : false;
};

exports.blacklistToken = async (user_id, token) => {
  await sadd(user_id, token);
  await expire(user_id, process.env.ACCESS_TOKEN_EXPIRY_5M_MS);
};
