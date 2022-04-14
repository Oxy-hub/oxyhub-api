const config = require('../../config');

exports.callbackHandler = async (_, res) => {
  res.render('authCallback', {
    targetOrigin: config.origin
  });
};
