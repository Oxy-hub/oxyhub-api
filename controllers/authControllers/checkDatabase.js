const User = require('../../models/user');
const { setIsInitial } = require('../../utils/helpers/redisHelpers');
exports.checkDatabase = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.user.email }).exec();

    if (user) {
      console.log('User Exists in Database : ', user);
    } else {
      user = new User(req.user);
      await user.save();
    }

    req.isInitial = user.isInitial;
    req.user_id = user._id;

    //Storing the registration status of the user in redis DB
    if (user.isInitial) {
      await setIsInitial(user._id, user.isInitial);
    }

    next();
  } catch (err) {
    //Error message
    console.log('Error from checkDatabase', err);
    res.sendStatus(400);
  }
};
