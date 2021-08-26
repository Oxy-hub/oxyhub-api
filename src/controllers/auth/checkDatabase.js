const User = require('../../models/User');
const {
  setIsInitial,
  deleteIsInitial
} = require('../../utils/helpers/redisHelpers');

const wrapAsync = require('../wrapAsync');

exports.checkDatabase = wrapAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  // Store the user in the database if the user does not exist in the db
  if (!user) {
    user = new User(req.user);
    await user.save();
  }

  // Attach the isInitial and the user id to the req object
  req.isInitial = user.isInitial;
  req.user_id = user.id;

  // Store userid:inital key in redis(if true otherwise delete) to prevent further database lookups during refresh
  if (user.isInitial) await setIsInitial(user.id);
  else await deleteIsInitial(user.id);

  next();
});
