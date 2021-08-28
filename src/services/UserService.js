const xss = require('xss');
const AppError = require('../errors/AppError');

class UserService {
  constructor({ userRepository, githubRepository }) {
    this.userRepository = userRepository;
    this.githubRepository = githubRepository;
  }

  sanitize(user) {
    const newObject = '';
    Object.keys(user).forEach(key => {
      const purified = xss(newObject[key]);
      newObject[key] = purified;
    });
    return user;
  }

  sanitizeName(name) {
    // eslint-disable-next-line
    name = name.split(' ');
    const firstName = name[0];
    const lastName = name[name.length - 1];
    const middleName = name.splice(1, name.length - 2).join(' ');

    return { firstName, middleName, lastName };
  }

  async useGithubOAuth(code) {
    const accessToken = await this.githubRepository.exchangeCodeForAccessToken(
      code
    );

    const [name, email] = await Promise.all([
      this.githubRepository.getUserProfile(accessToken),
      this.githubRepository.getUserEmail(accessToken)
    ]);

    const user = this.sanitizeName(name);
    return { ...user, email };
  }

  async login(userProfile) {
    // Check if user already exists in database
    let user = await this.userRepository.readUserByEmail(userProfile.email);

    // Store the user in the database if the user does not exist in the db
    if (!user) {
      user = await this.userRepository.createUser(userProfile);
    }

    // Store userid:inital key in redis(if true otherwise delete) to prevent further database lookups during refresh
    if (user.isInitial) {
      await this.userRepository.updateIsInitial(user.id);
    } else {
      await this.userRepository.deleteIsInitial(user.id);
    }

    return { isInitial: user.isInitial, userId: user.id };
  }

  async register(id, user) {
    try {
      const userDetails = this.sanitize(user);
      await this.userRepository.updateUser(id, userDetails);
      await this.userRepository.deleteIsInitial(id);
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

module.exports = UserService;
