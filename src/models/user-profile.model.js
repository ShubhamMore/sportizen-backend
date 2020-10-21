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
  height: {
    type: String,
  },
  heightType: {
    type: String,
  },
  weight: {
    type: String,
  },
  weightType: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  profileViews: {
    type: Number,
    default: 0,
  },
  location: {
    homeLocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: String,
      },
      area: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    variableLocation: [
      {
        latitude: {
          type: Number,
        },
        longitude: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  phoneNo: {
    type: String,
    validate: /[0-9]/,
  },
  story: {
    type: String,
    default: null,
  },
  accountType: {
    type: String,
    default: 'public', // public, private
  },
  sportsInterest: [String],
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
  userAchievements: [
    {
      achievementType: {
        type: String,
      },
    },
  ],
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
