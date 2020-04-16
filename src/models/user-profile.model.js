const mongoose = require('mongoose');
const validator = require('validator');

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  profileCompleted: {
    type: String,
    default: '0',
  },
  sportsInterest: [String],
  birthDate: {
    type: String,
  },
  gender: {
    type: String,
  },
  userImage: {
    image_name: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
