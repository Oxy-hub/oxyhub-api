const axios = require('axios');
const config = require('../config');

class GoogleRepository {
  async exchangeCodeForAccessToken(code) {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: config.google.clientId,
        client_secret: config.google.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.google.redirectUri
      },
      { headers: { Accept: 'application/json' } }
    );
    return response.data.access_token;
  }

  async getUserProfile(accessToken) {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    return response.data;
  }
}

exports.GoogleRepository = GoogleRepository;
