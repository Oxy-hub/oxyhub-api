const { getObjectId } = require('mongo-seeding');
const { states } = require('../../utils/state-districts.json');

module.exports = states.map(state => ({
  name: state.name,
  code: state.code,
  districts: state.districts.map(district => ({
    _id: getObjectId(district.name),
    name: district.name
  }))
}));
