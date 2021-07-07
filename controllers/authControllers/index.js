const { idTokenVerification } = require('./idTokenVerification');
const { generateTokens } = require('./generateTokens');
const { checkDatabase } = require('./checkDatabase');
module.exports = {
  idTokenVerification,
  generateTokens,
  checkDatabase,
};
