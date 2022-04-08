const { Container } = require('../../loaders/awilix');
const { createSuccessDto, districts: districtDtos } = require('../../dto');

exports.fetchDistricts = async (req, res) => {
  const { state } = req.query;

  const DistrictService = Container.resolve('districtService');

  const districts = await DistrictService.fetchDistricts(state);

  return res.send(
    createSuccessDto(
      `Districts for the state ${state} successfully found!`,
      districtDtos.getResponse(districts)
    )
  );
};
