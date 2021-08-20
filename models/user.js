const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    uppercase: true,
    trim: true
  },
  middle_name: {
    type: String,
    uppercase: true,
    trim: true
  },
  last_name: {
    type: String,
    uppercase: true,
    trim: true
  },
  isInitial: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
