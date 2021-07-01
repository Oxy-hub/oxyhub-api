const jwt = require('jsonwebtoken');

exports.generateTokens = (req, res, next) => {
  const payload = 'Id token verified';
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 120 });

  //Sending back HTTPonly cookie in response object
  res.cookie('aid', accessToken, { httpOnly: true });
  res.send(200);

  next();
};
