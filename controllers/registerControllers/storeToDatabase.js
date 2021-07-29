const User = require('../../models/user');
const purify = require('../../utils/xssCheck');
exports.storeToDatabase = async (req, res, next) => {
  try {
    if (!req.user.id_number === undefined) {
      throw new Error();
    }
    const user = purify(req.body);
    // console.log('user', user);
    // console.log('req.user : ', req.user);
    const query = await User.findOneAndUpdate({ phone_number: req.user.phone_number }, user, {
      new: true,
      lean: true,
    });
    // console.log('Updated query', query);
    const { phone_number, first_name, last_name, id_type, id_number } = query;
    req.user = { phone_number, first_name, last_name, id_type, id_number };
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
