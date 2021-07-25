const User = require('../../models/user');

exports.checkDatabase = async (req, res, next) => {
  try {
    const query = await User.findOne({ email: req.user.email }).exec();

    if (query) {
      console.log('query', query);
      req.user = {
        user_id: query._id,
        email: query.email,
        name: query.name,
        id_type: query.id_type,
        id_number: query.id_number,
      };
    } else {
      const newUser = new User({ email: req.user.email, name: req.user.name });
      await newUser.save();
      req.user = {
        email: newUser.email,
        name: newUser.name,
      };
    }

    next();
  } catch (err) {
    //Error message
    console.log('Error from checkDatabase', err);
    res.sendStatus(400);
  }
};
