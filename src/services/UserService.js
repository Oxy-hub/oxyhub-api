const xss = require('xss');

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  sanitize(user) {
    const newObject = '';
    Object.keys(user).forEach(key => {
      const purified = xss(newObject[key]);
      newObject[key] = purified;
    });
    return user;
  }

  // Register initial user to database
  async register(id, user) {
    try {
      // Sanitize the user details input to avoid XSS
      const userDetails = this.sanitize(user);

      // Update database with user details
      await this.userRepository.updateUser(id, userDetails);

      // Delete isInitial status from redis
      await this.userRepository.deleteIsInitial(id);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}

module.exports = UserService;
