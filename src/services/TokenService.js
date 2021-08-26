const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../errors/AppError');

class TokenService {
  constructor({ tokenRepository }) {
    this.tokenRepository = tokenRepository;
  }

  verify(token, secret) {
    // Verify jwt token
    return jwt.verify(token, secret, {
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  async verifyAccessToken(token) {
    try {
      const secret = config.tokens.accessTokenSecret;
      const { id } = this.verify(token, secret);

      // Check redis for blacklisted tokens
      const isBlacklisted = await this.tokenRepository.readBlackList(id, token);

      // If token is not blacklisted get isInitial status of the token
      let isInitial = false;
      if (!isBlacklisted) {
        isInitial = await this.tokenRepository.readIsInitial(id);
      } else {
        throw new Error();
      }
      return { id, isInitial };
    } catch (e) {
      throw new AppError(401, 'Unauthorized!');
    }
  }
}

module.exports = TokenService;
