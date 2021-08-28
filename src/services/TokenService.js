const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../errors/AppError');

class TokenService {
  constructor({ tokenRepository, userRepository }) {
    this.tokenRepository = tokenRepository;
    this.userRepository = userRepository;
  }

  verify(token, secret) {
    // Verify jwt token
    return jwt.verify(token, secret, {
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  async isBlacklisted(id, token) {
    // Check redis for blacklisted tokens
    const isBlacklisted = await this.tokenRepository.readBlackList(id, token);
    if (isBlacklisted) {
      throw new Error();
    } else {
      return false;
    }
  }

  async verifyAccessToken(token) {
    try {
      const secret = config.tokens.accessTokenSecret;
      const { id } = this.verify(token, secret);

      // If token is not blacklisted get isInitial status of the token
      this.isBlacklisted(id, token);
      const isInitial = await this.userRepository.readIsInitial(id);
      return { id, isInitial };
    } catch (e) {
      throw new AppError(401, 'Unauthorized!');
    }
  }
}

module.exports = TokenService;
