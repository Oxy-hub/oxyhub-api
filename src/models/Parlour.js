const mongoose = require('mongoose');
const config = require('../config');

const autoIndex = config.mode !== 'production';

const parlourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    ownerName: {
      type: String,
      trim: true,
      required: true
    },
    ownerContact: {
      type: Number,
      required: true
    },
    storeId: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    location: {
      address: {
        type: String,
        trim: true,
        required: true
      },
      stateCode: {
        type: String,
        trim: true,
        required: true
      },
      district: {
        type: String,
        trim: true,
        required: true
      },
      pincode: {
        type: String,
        required: true,
        maxLength: 6,
        minLength: 6
      }
    }
  },
  { autoIndex }
);

parlourSchema.index({ 'location.stateCode': 1, 'location.district': 1 });

const Parlour = mongoose.model('Parlour', parlourSchema);

module.exports = Parlour;
