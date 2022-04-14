const postRequest = require('./postRequest');
const postResponse = require('./postResponse');
const getResponse = require('./me/getRequest');

module.exports = {
  postRequest,
  postResponse,
  me: {
    getResponse
  }
};
