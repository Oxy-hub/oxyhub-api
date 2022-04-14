class UserRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  toPersistance(user) {
    return {
      firstName: user.first_name,
      middleName: user.middle_name,
      lastName: user.last_name,
      email: user.email,
      avatar: user.avatar
    };
  }

  async createUser(data) {
    const newUser = new this.UserModel(this.toPersistance(data));
    await newUser.save();
    return newUser;
  }

  async readUser(filter) {
    const user = await this.UserModel.findOne(filter);
    return user;
  }

  async readUserByEmail(email) {
    const user = await this.readUser({ email });
    return user;
  }

  // async updateUser(id, userObject) {
  //   await this.userModel.findByIdAndUpdate(id, userObject, {
  //     new: true,
  //     lean: true
  //   });
  // }
}

exports.UserRepository = UserRepository;
