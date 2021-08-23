class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async updateUserInfo(id, user) {
    try {
      await this.userRepository.findByIdAndUpdate(id, user);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}

module.exports = UserService;
