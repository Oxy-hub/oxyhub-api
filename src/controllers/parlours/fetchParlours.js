const { Container } = require('../../loaders/awilix');
const { createSuccessDto, parlours: parlourDtos } = require('../../dto');

exports.fetchParlours = async (req, res) => {
  const { state, district, type } = req.query;

  const ParlourService = Container.resolve('parlourService');

  const parlours = await ParlourService.fetchParlours(state, district, type);

  return res.send(
    createSuccessDto(
      'Parlours in your location successfully found!',
      parlourDtos.getResponse(parlours)
    )
  );
};
