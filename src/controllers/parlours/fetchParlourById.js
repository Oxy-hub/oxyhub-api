const { Container } = require('../../loaders/awilix');
const { createSuccessDto, parlours: parlourDtos } = require('../../dto');

exports.fetchParlourById = async (req, res) => {
  const { id } = req.params;

  const ParlourService = Container.resolve('parlourService');

  const parlour = await ParlourService.fetchParlourByStoreId(id);

  return res.send(
    createSuccessDto(
      `Found details of parlour with id : ${id}`,
      parlourDtos.getByIdResponse(parlour)
    )
  );
};
