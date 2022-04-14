const { Container } = require('../../loaders/awilix');
const { createSuccessDto, users: userDtos } = require('../../dto');

exports.getLoggedInUser = async (req, res) => {
  // Resolve user service from container
  const UserService = Container.resolve('userService');

  // Fetch the User from user service
  const user = await UserService.fetchUser(req.userId);

  // Return the user in the correct format
  return res.send(
    createSuccessDto('User successfully found!', userDtos.me.getResponse(user))
  );
};
