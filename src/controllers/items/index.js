const { fetchItems } = require('./fetchItems');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  fetchItems: wrapAsync(fetchItems)
};
