const { getStates } = require('./getStates');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  getStates: wrapAsync(getStates)
};
