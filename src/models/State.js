const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  }
});

const stateSchema = new mongoose.Schema({
  code: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  districts: [districtSchema]
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
