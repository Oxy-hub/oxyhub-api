const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    middleName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    lastLogin: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
