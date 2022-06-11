const AppError = require('../errors/AppError');

class ItemService {
  constructor({ itemRepository }) {
    this.itemRepository = itemRepository;
  }

  async fetchItems(id) {
    const items = await this.itemRepository.getItems(id);

    if (items.length === 0) {
      throw new AppError(400, 'Items could not be found!');
    }

    return items;
  }
}

exports.ItemService = ItemService;
