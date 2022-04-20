module.exports = payload => ({
  code: payload.code,
  name: payload.name,
  districts: payload.districts.map(district => ({
    name: district.name
  })),
  total: payload.districts.length
});
