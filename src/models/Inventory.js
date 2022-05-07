const mongoose = require('mongoose');
const config = require('../config');

const autoIndex = config.mode !== 'production';

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
    variants: [
      {
        name: String,
        sku: String,
        quanity: Number,
        height: String,
        waterCapacity: String,
        oxygenCapacity: String,
        price: {
          sale: Number,
          rent: Number
        }
      }
    ]
  },
  { autoIndex }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
