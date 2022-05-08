const { Container } = require('../../loaders/awilix');
const { createSuccessDto, items: itemDtos } = require('../../dto');

exports.fetchItems = async (req, res) => {
  const { id } = req.params;

  const ItemService = Container.resolve('itemService');

  const items = await ItemService.fetchItems(id);

  return res.send(
    createSuccessDto(
      `${items.length} items found for this store!`,
      itemDtos.getResponse(items)
    )
  );
};
