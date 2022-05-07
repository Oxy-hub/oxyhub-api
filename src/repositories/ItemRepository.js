class ItemRepository {
  constructor({ InventoryModel }) {
    this.InventoryModel = InventoryModel;
  }

  async readInventory(filter) {
    const items = await this.InventoryModel.find(filter).exec();
    return items;
  }

  async getItems(id) {
    return this.readInventory({
      storeId: id
    });
  }
}

exports.ItemRepository = ItemRepository;
