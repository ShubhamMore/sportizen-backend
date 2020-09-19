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
  phoneNo: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    default: null,
  },
  sportsInterest: [String],
  friends: [],
  followers: [],
  birthDate: {
    type: String,
  },
  gender: {
    type: String,
  },
  userImageURL: {
    type: String,
    default: 'https://s3.ap-south-1.amazonaws.com/shubhammore.developer/shared/no_user.jpg',
  },
  userCoverImageURL: {
    type: String,
    default: 'https://s3.ap-south-1.amazonaws.com/shubhammore.developer/shared/no_user.jpg',
  },
  userImage: {
    image_name: {
      type: String,
    },
    secure_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
    created_at: {
      type: Date,
    },
  },
  userImage: {
    image_name: {
      type: String,
    },
    secure_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
    created_at: {
      type: Date,
    },
  },
  userCoverImage: {
    image_name: {
      type: String,
    },
    secure_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
    created_at: {
      type: Date,
    },
  },
  userProvider: {
    type: String,
    required: true,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
