const { fetchParlours } = require('./fetchAllParlours');
const { fetchParlourById } = require('./fetchParlourById');
const wrapAsync = require('../../utils/wrapAsync');

module.exports = {
  fetchParlours: wrapAsync(fetchParlours),
  fetchParlourById: wrapAsync(fetchParlourById)
};
