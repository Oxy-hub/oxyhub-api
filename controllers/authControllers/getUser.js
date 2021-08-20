const axios = require('axios');

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

exports.getUser = async (req, res, next) => {
  try {
    const { accessToken } = req;
    const [user, email] = await Promise.all([
      getUserAccount(accessToken),
      getUserEmail(accessToken)
    ]);

    if (!email.data[0].verified) throw new Error();

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
  } catch (err) {
    console.log('This is error during fetching user data : ', err);
    res.sendStatus(400);
  }
};
