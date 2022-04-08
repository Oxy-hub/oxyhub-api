const { fetchDistricts } = require('./fetchDistricts');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  fetchDistricts: wrapAsync(fetchDistricts)
};
