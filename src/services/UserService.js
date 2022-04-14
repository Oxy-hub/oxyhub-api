// const xss = require('xss');
const AppError = require('../errors/AppError');

class UserService {
  constructor({ userRepository, githubRepository, utilityService }) {
    this.userRepository = userRepository;
    this.githubRepository = githubRepository;
    this.utilityService = utilityService;
  }

  async registerUser(isInitial, data) {
    // Only allow registration if isInitial is present
    if (!isInitial) {
      throw new Error();
    }

    // Sanitize user input to prevent XSS
    const sanitizedUser = this.utilityService.sanitizeObject(data, {
      skipKeys: ['avatar']
    });

    // Check if the user already exists in the database
    const user = await this.userRepository.readUserByEmail(sanitizedUser.email);
    if (user) {
      throw new AppError(401, 'User already exists!', [
        'User with the same email has already been created'
      ]);
    }

    // Create a new user in the database
    const newUser = await this.userRepository.createUser(sanitizedUser);

    return newUser;
  }

  async fetchUser(userId) {
    // Fetch user from Database by Id
    if (!userId) {
      throw new Error();
    }

    const user = await this.userRepository.readUserById(userId);

    if (!user) {
      throw new AppError(400, 'User was not found!', [
        'The id of the access token does not correspond to any user in the database'
      ]);
    }

    return user;
  }
}

exports.UserService = UserService;
