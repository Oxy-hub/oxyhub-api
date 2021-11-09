const { Container } = require('../../loaders/awilix');
const { createSuccessDto, getUserResponseDto } = require('../../dto');

exports.getUser = async (req, res) => {
  // Resolve user service from container
  const UserService = Container.resolve('userService');

  // Fetch the User from user service
  const user = await UserService.fetchUser(req.userId);

  // Return the user in the correct format
  return res.send(
    createSuccessDto('User successfully found!', getUserResponseDto(user))
  );
};
