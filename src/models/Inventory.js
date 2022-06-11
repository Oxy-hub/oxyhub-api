const mongoose = require('mongoose');
const config = require('../config');

const autoIndex = config.mode !== 'production';

const variantSchema = new mongoose.Schema({
  name: String,
  sku: String,
  quantity: Number,
  height: String,
  waterCapacity: String,
  oxygenCapacity: String,
  price: {
    sale: Number,
    rent: Number
  }
});

// eslint-disable-next-line func-names
variantSchema.virtual('availability').get(function () {
  return this.quantity > 0;
});

variantSchema.set('toJSON', { virtuals: true });

const inventorySchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    productId: {
      type: String,
      trim: true,
      required: true
    },
    type: {
      type: Number,
      enum: [0, 1],
      required: true
    },
    variants: { type: [variantSchema] }
  },
  { autoIndex }
);

// eslint-disable-next-line func-names
inventorySchema.virtual('cylinderType').get(function () {
  switch (this.type) {
    case 0:
      return { value: 0, label: 'Steel' };
    case 1:
      return { value: 1, label: 'Aluminium' };

    default:
      return null;
  }
});

inventorySchema.set('toJSON', { virtuals: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
