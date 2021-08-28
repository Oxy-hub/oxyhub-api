const axios = require('axios');
const config = require('../config');

class GithubRepository {
  async exchangeCodeForAccessToken(code) {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code
      },
      { headers: { Accept: 'application/json' } }
    );
    return response.data.access_token;
  }

  async getUserProfile(accessToken) {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` }
    });
    return response.data.name;
  }

  async getUserEmail(accessToken) {
    const response = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${accessToken}` }
    });
    return response.data[0];
  }
}

module.exports = GithubRepository;
