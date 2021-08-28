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
