const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone_number: {
    type: Number,
    min: 10,
    max: 10,
    required: true,
  },
  first_name: {
    type: String,
    uppercase: true,
    trim: true,
  },
  last_name: {
    type: String,
    uppercase: true,
    trim: true,
  },
  id_type: {
    type: String,
    trim: true,
    enum: ['Aadhar', 'Driving Licence', 'Pan Card', 'Passport', 'Voter Id Card'],
  },
  id_number: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
