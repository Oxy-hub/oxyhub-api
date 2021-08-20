const axios = require('axios');

const wrapAsync = require('../../utils/wrapAsync');

exports.getAccessToken = wrapAsync(async (req, res, next) => {
  const { code } = req.query;
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    { headers: { Accept: 'application/json' } }
  );
  req.access_token = response.data.access_token;
  next();
});
