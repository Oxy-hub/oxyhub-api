const { fetchStates } = require('./fetchStates');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  fetchStates: wrapAsync(fetchStates)
};
