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
    try {
      const accessToken =
        await this.githubRepository.exchangeCodeForAccessToken(code);
      const [name, email] = await Promise.all([
        this.githubRepository.getUserProfile(accessToken),
        this.githubRepository.getUserEmail(accessToken)
      ]);

      const user = this.sanitizeName(name);
      return { ...user, email };
    } catch (e) {
      throw new AppError(400, 'Github failed to authorize user!');
    }
  }

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

  async register(id, user) {
    try {
      // Sanitize user input to prevent XSS
      const userDetails = this.sanitize(user);

      // Update sanitized user details in Database
      await this.userRepository.updateUser(id, userDetails);

      // Delete isInitial from redis server to denote that this is not a first time user
      await this.userRepository.deleteIsInitial(id);
    } catch (e) {
      throw AppError.serverError();
    }
  }

  async fetchUser(userId) {
    try {
      // Fetch user from Database by Id
      const { id, email, firstName, middleName, lastName } =
        await this.userRepository.readUserById(userId);
      return { id, email, firstName, middleName, lastName };
    } catch (e) {
      throw AppError.serverError();
    }
  }
}

module.exports = UserService;
