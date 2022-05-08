const { Container } = require('../../loaders/awilix');
const { createSuccessDto, parlours: parlourDtos } = require('../../dto');

exports.fetchParlours = async (req, res) => {
  const { state, district } = req.query;

  const ParlourService = Container.resolve('parlourService');

  const parlours = await ParlourService.fetchAllParlours(state, district);

  return res.send(
    createSuccessDto(
      `${parlours.length} parlours found in your location!`,
      parlourDtos.getResponse(parlours)
    )
  );
};
