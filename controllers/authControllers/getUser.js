const axios = require('axios');

//call to get back the user
const getUserAccount = access_token => {
  return axios.get('https://api.github.com/user', {
    headers: { Authorization: `token ${access_token}` },
  });
};

//call to get back the user email
const getUserEmail = access_token => {
  return axios.get('https://api.github.com/user/emails', {
    headers: { Authorization: `token ${access_token}` },
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const access_token = req.access_token;
    const [user, email] = await Promise.all([
      getUserAccount(access_token),
      getUserEmail(access_token),
    ]);

    console.log(user.data);
    console.log(email.data);
    res.sendStatus(200);
  } catch (err) {
    console.log('This is error during fetching user data : ', err);
    res.sendStatus(400);
  }
};
// GET https://api.github.com/user
