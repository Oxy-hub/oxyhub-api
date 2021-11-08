const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    uppercase: true,
    trim: true
  },
  middleName: {
    type: String,
    uppercase: true,
    trim: true
  },
  lastName: {
    type: String,
    uppercase: true,
    trim: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
