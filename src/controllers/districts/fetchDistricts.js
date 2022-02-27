// const { Container } = require('../../loaders/awilix');
// const config = require('../../config');
// const { createSuccessDto, authResponseDto } = require('../../dto');

exports.fetchDistricts = async (req, res) => {
  console.log('Query Districts', req.query);
  res.send('OK');
};
