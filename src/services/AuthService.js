const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../errors/AppError');
const config = require('../config');

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const GOOGLE = 'google';
const GITHUB = 'github';

class AuthService {
  constructor({
    userRepository,
    tokenRepository,
    githubRepository,
    googleRepository
  }) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
    this.githubRepository = githubRepository;
    this.googleRepository = googleRepository;
  }

  async fetchProfile(code, type) {
    let profile = null;
    switch (type) {
      case GITHUB:
        profile = await this.useGithubOAuth(code);
        break;

      case GOOGLE:
        profile = await this.useGoogleOAuth(code);
        break;

      default:
        throw new Error();
    }
    return profile;
  }

  /** OAuth Methods */
  /** ---------------------------------------- */
  async useGithubOAuth(code) {
    try {
      const accessToken =
        await this.githubRepository.exchangeCodeForAccessToken(code);
      // eslint-disable-next-line camelcase
      const [{ name, avatar_url }, email] = await Promise.all([
        this.githubRepository.getUserProfile(accessToken),
        this.githubRepository.getUserEmail(accessToken)
      ]);

      const user = this.splitName(name);
      return { ...user, email, avatar: avatar_url };
    } catch (e) {
      throw new AppError(400, 'Github failed to authorize user!');
    }
  }

  // eslint-disable-next-line
  async useGoogleOAuth(code) {
    try {
      const accessToken =
        await this.googleRepository.exchangeCodeForAccessToken(code);

      const { name, email, picture } =
        await this.googleRepository.getUserProfile(accessToken);

      const user = this.splitName(name);
      return { ...user, email, avatar: picture };
    } catch (e) {
      throw new AppError(400, 'Google failed to authorize user!');
    }
  }
  /** ---------------------------------------- */

  /** Login & Logout Methods */
  /** ---------------------------------------- */
  async login(userProfile) {
    try {
      // Check if user already exists in database
      const user = await this.userRepository.readUserByEmail(userProfile.email);

      // If the user does not exist, user is coming for first time
      if (!user) {
        return { isInitial: true, userId: null };
      }

      // If user exists, return the userId
      return { isInitial: false, userId: user.id };
    } catch (e) {
      throw AppError.serverError();
    }
  }

  // eslint-disable-next-line
  async logout() {}
  /** ---------------------------------------- */

  /** Access and Refresh Token Generator Methods */
  /** ---------------------------------------- */
  generateAccessToken(id, data = {}) {
    const accessToken = this.mintTokens(
      {
        id,
        data
      },
      ACCESS_TOKEN
    );
    return accessToken;
  }

  async generateRefreshToken(id, data = {}) {
    const jti = uuidv4();
    const refreshToken = this.mintTokens(
      {
        id,
        data,
        jti
      },
      REFRESH_TOKEN
    );
    await this.tokenRepository.storeRefreshToken(
      `${id}:${jti}`,
      config.tokens.expiry.refreshToken
    );
    return refreshToken;
  }
  /** ---------------------------------------- */

  /** Access and Refresh Verification Methods */
  /** ---------------------------------------- */
  async verifyAccessToken(token) {
    try {
      // Verify whether the token is valid or not
      const secret = config.tokens.secrets.accessToken;
      const payload = this.tokenVerifier(token, secret);

      // If token is verified, return the token data
      return payload;
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        throw new AppError(401, 'Session Expired! Reload and Try Again.', [
          'Access token expired'
        ]);
      else if (e.name === 'JsonWebTokenError')
        throw new AppError(401, 'Invalid Request! Reload and Try Again', [
          'Failed to verify access token'
        ]);
      else throw new Error();
    }
  }

  async verifyRefreshToken(refreshToken) {
    try {
      console.log('AAAAAAAA', refreshToken);
      const secret = config.tokens.secrets.refreshToken;

      // Verify the validity of refresh token
      const { id, jti } = this.verify(refreshToken, secret);

      // Check whether the refresh token is whitelisted in redis
      await this.tokenRepository.validateRefreshTokenFromRedis(id, jti);

      // Delete the existing refresh token in redis to facilitate rotation
      await this.tokenRepository.deleteRefreshTokenFromRedis(id, jti);

      return id;
    } catch (e) {
      console.log(e);
      throw new AppError(401, 'Unauthorized! Failed to verify refresh token.');
    }
  }

  /** HELPER METHODS */
  /** ---------------------------------------- */
  splitName(name) {
    // eslint-disable-next-line
    name = name.split(' ');

    const firstName = name[0];
    const lastName = name[name.length - 1];
    const middleName = name.splice(1, name.length - 2).join(' ');

    return { firstName, middleName, lastName };
  }

  tokenGenerator(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {
      expiresIn,
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  tokenVerifier(token, secret) {
    return jwt.verify(token, secret, {
      audience: 'oxyhub-api',
      algorithm: 'HS256'
    });
  }

  mintTokens(payload, type) {
    try {
      switch (type) {
        case ACCESS_TOKEN:
          return this.tokenGenerator(
            payload,
            config.tokens.secrets.accessToken,
            config.tokens.expiry.accessToken
          );

        case REFRESH_TOKEN:
          return this.tokenGenerator(
            payload,
            config.tokens.secrets.refreshToken,
            config.tokens.expiry.refreshToken
          );

        default:
          throw new Error();
      }
    } catch (e) {
      throw AppError.serverError();
    }
  }
  /** ---------------------------------------- */
}

exports.AuthService = AuthService;
