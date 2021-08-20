const { getAccessToken } = require('./getAccessToken');
const { generateTokens } = require('./generateTokens');
const { checkDatabase } = require('./checkDatabase');
const { getUser } = require('./getUser');
module.exports = {
  getAccessToken,
  getUser,
  generateTokens,
  checkDatabase
};
