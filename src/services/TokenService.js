const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const AppError = require('../errors/AppError');

class TokenService {
  constructor({ tokenRepository, userRepository }) {
    this.tokenRepository = tokenRepository;
    this.userRepository = userRepository;
  }

  generate(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {
      expiresIn,
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  mintAccessToken(payload) {
    try {
      return this.generate(
        payload,
        config.tokens.secrets.accessToken,
        config.tokens.expiry.accessToken
      );
    } catch (e) {
      throw AppError.serverError();
    }
  }

  mintRefreshToken(payload) {
    try {
      return this.generate(
        payload,
        config.tokens.secrets.refreshToken,
        config.tokens.expiry.refreshToken
      );
    } catch (e) {
      throw AppError.serverError();
    }
  }

  generateAccessToken(id, data = {}) {
    const accessToken = this.mintAccessToken({
      id,
      isInital: data.isInital,
      data
    });
    return accessToken;
    // Some other stuff about blacklisting this token
  }

  generateRefreshToken(id, data = {}) {
    const jti = uuidv4();
    const refreshToken = this.mintRefreshToken({
      id,
      data,
      jti
    });
    // this.tokenRepository.createRefreshTokenInRedis(id, jti);
    return refreshToken;
  }

  verify(token, secret) {
    return jwt.verify(token, secret, {
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  async verifyAccessToken(token) {
    try {
      // const secret = config.tokens.accessTokenSecret;
      // const { id } = this.verify(token, secret);

      // // If token is not blacklisted get isInitial status of the token
      // this.isBlacklisted(id, token);
      // const isInitial = await this.userRepository.readIsInitial(id);
      // return { id, isInitial };

      const secret = config.tokens.secrets.accessToken;
      const data = this.verify(token, secret);

      // if isInital is true, then just return true, no need for other verification.
      if (data.isInitial) {
        return data;
      }

      // Otherwise perform the redis checks
      return data;
    } catch (e) {
      throw new AppError(401, 'Failed to verify access token!');
    }
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

  // generateLoginTokens(id, isInitial) {
  //   try {
  //     const jti = uuidv4();
  //     const accessToken = this.generateAccessToken({ id, isInitial });

  //     // If user is initial, return both access and refresh tokens
  //     if (!isInitial) {
  //       const refreshToken = this.generateRefreshToken({ jti, id });
  //       this.tokenRepository.createRefreshTokenInRedis(id, jti);
  //       return { accessToken, refreshToken };
  //     }

  //     // If user is not initial, only return access token
  //     return { accessToken, refreshToken: null };
  //   } catch (e) {
  //     throw AppError.serverError();
  //   }
  // }

  // generateTokens(id, data = {}, type = null) {
  //   const jti = uuidv4();
  //   switch (type) {
  //     case 'INITIAL_USER': {
  //       const accessToken = this.generateAccessToken({
  //         id,
  //         isInital: true,
  //         data
  //       });
  //       return accessToken;
  //       // Some other stuff about blacklisting this token
  //     }

  //     default: {
  //       const accessToken = this.generateAccessToken({
  //         id,
  //         isInital: false,
  //         data
  //       });
  //       // Some other stuff about whitelisting this token
  //       const refreshToken = this.generateRefreshTokens({
  //         id,
  //         jti
  //       });

  //       return { accessToken, refreshToken };
  //     }
  //   }
  // }
}

exports.TokenService = TokenService;
