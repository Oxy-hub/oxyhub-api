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
      const [name, email] = await Promise.all([
        this.githubRepository.getUserProfile(accessToken),
        this.githubRepository.getUserEmail(accessToken)
      ]);

      const user = this.splitName(name);
      return { ...user, email };
    } catch (e) {
      throw new AppError(400, 'Github failed to authorize user!');
    }
  }

  // eslint-disable-next-line
  async useGoogleOAuth(code) {
    try {
      const accessToken =
        await this.googleRepository.exchangeCodeForAccessToken(code);

      const { name, email } = await this.googleRepository.getUserProfile(
        accessToken
      );

      const user = this.splitName(name);
      return { ...user, email };
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
    await this.tokenRepository.createRefreshTokenInRedis(id, jti);
    return refreshToken;
  }
  /** ---------------------------------------- */

  /** Access and Refresh Verification Methods */
  /** ---------------------------------------- */
  async verifyAccessToken(token) {
    try {
      // const secret = config.tokens.accessTokenSecret;
      // const { id } = this.verify(token, secret);

      // // If token is not blacklisted get isInitial status of the token
      // this.isBlacklisted(id, token);
      // const isInitial = await this.userRepository.readIsInitial(id);
      // return { id, isInitial };

      const secret = config.tokens.secrets.accessToken;
      const data = this.verifyToken(token, secret);

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

exports.AuthService = AuthService;
