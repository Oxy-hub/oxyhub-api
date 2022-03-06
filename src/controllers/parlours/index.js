const { fetchParlours } = require('./fetchParlours');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  fetchParlours: wrapAsync(fetchParlours)
};
