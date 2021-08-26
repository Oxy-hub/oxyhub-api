// const User = require('../../models/User');
// const purify = require('../../utils/xssCheck');
// const deleteIsInitial = require('../../utils/helpers/redisHelpers');
// const wrapAsync = require('../../utils/wrapAsync');

// exports.registerUser = wrapAsync(async (req, res) => {
//   if (!req.user_id || req.isInitial === false) {
//     res.send('Uh uh. not allowed to register!');
//   } else {
//     const user = purify(req.body);
//     await User.findByIdAndUpdate(req.user_id, user, {
//       new: true,
//       lean: true
//     });
//     // await deleteIsInitial(req.user_id);
//     res.sendStatus(200);
//   }
// });
const AppError = require('../../errors/AppError');
const { Container } = require('../../loaders/awilix');

exports.registerUser = (req, res) => {
  if (req.userId && req.isInitial) {
    const UserService = Container.resolve('userService');
    UserService.register(req.userId, req.body);
  } else {
    throw new AppError(401, 'Authentication Failed');
  }
  res.sendStatus(200);
};
