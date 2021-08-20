const User = require('../../models/user');
const purify = require('../../utils/xssCheck');
const deleteIsInitial = require('../../utils/helpers/redisHelpers');
const wrapAsync = require('../../utils/wrapAsync');

exports.storeToDatabase = wrapAsync(async (req, res) => {
  if (!req.user_id || req.isInitial === false) {
    res.send('Uh uh. not allowed to register!');
  } else {
    const user = purify(req.body);
    await User.findByIdAndUpdate(req.user_id, user, {
      new: true,
      lean: true
    });
    await deleteIsInitial(req.user_id);
    res.sendStatus(200);
  }
});
