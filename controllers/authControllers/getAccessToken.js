// const admin = require('firebase-admin');
const axios = require('axios');
exports.getAccessToken = async (req, res, next) => {
  try {
    const code = req.query.code;

    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );
    req.access_token = response.data.access_token;
    next();
  } catch (err) {
    console.log('This is error during code exchange : ', err);
    res.sendStatus(400);
  }
};
