const axios = require('axios');

const wrapAsync = require('../wrapAsync');
const AppError = require('../../utils/AppError');

// call to get back the user
const getUserAccount = accessToken =>
  axios.get('https://api.github.com/user', {
    headers: { Authorization: `token ${accessToken}` }
  });

// call to get back the user email
const getUserEmail = accessToken =>
  axios.get('https://api.github.com/user/emails', {
    headers: { Authorization: `token ${accessToken}` }
  });

exports.getUser = wrapAsync(async (req, res, next) => {
  const { accessToken } = req;
  const [user, email] = await Promise.all([
    getUserAccount(accessToken),
    getUserEmail(accessToken)
  ]);

  if (!email.data[0].verified) throw new AppError('Email not verified', 400);

  const name = user.data.name.split(' ');
  const firstName = name[0];
  const lastName = name[name.length - 1];
  const middleName = name.splice(1, name.length - 2).join(' ');

  req.user = {
    firstName,
    middleName,
    lastName,
    email: email.data[0].email
  };

  console.log('User from Github', req.user);
  next();
});
