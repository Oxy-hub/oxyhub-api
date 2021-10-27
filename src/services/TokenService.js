const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const AppError = require('../errors/AppError');

class TokenService {
  constructor({ tokenRepository, userRepository }) {
    this.tokenRepository = tokenRepository;
    this.userRepository = userRepository;
  }

  verify(token, secret) {
    return jwt.verify(token, secret, {
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  generate(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {
      expiresIn,
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  async isBlacklisted(id, token) {
    // Check redis for blacklisted tokens
    const blacklist = await this.tokenRepository.readBlackList(id);
    if (blacklist.includes(token)) {
      throw new Error();
    } else {
      return false;
    }
  }

  generateLoginTokens(id, isInitial) {
    try {
      const jti = uuidv4();
      const accessToken = this.generateAccessToken({ id, isInitial });

      // If user is initial, return both access and refresh tokens
      if (!isInitial) {
        const refreshToken = this.generateRefreshToken({ jti, id });
        this.tokenRepository.createRefreshTokenInRedis(id, jti);
        return { accessToken, refreshToken };
      }

      // If user is not initial, only return access token
      return { accessToken, refreshToken: null };
    } catch (e) {
      throw AppError.serverError();
    }
  }

  generateAccessToken(payload) {
    try {
      return this.generate(
        payload,
        config.tokens.accessTokenSecret,
        config.tokens.expiry.accessToken
      );
    } catch (e) {
      throw AppError.serverError();
    }
  }

  generateRefreshToken(payload) {
    try {
      return this.generate(
        payload,
        config.tokens.refreshTokenSecret,
        config.tokens.expiry.refreshToken
      );
    } catch (e) {
      throw AppError.serverError();
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
