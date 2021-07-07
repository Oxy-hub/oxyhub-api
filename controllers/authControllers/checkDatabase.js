const User = require('../../models/user');

exports.checkDatabase = async (req, res, next) => {
  try {
    const query = await User.findOne({ phone_number: req.phoneNumber }).exec();
    if (query) {
      console.log('query', query);
      req.user = query;
    } else {
      const newUser = new User({ phone_number: req.phoneNumber });
      await newUser.save();
    }
    next();
  } catch (err) {
    //Error message
    console.log('Error from checkDatabase', err);
    res.sendStatus(400);
  }
};
