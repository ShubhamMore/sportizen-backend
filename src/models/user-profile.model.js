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
  sportizenId: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: null,
  },
  heightType: {
    type: String,
    default: 'cm',
  },
  weight: {
    type: String,
    default: null,
  },
  weightType: {
    type: String,
    default: 'lbs',
  },
  birthDate: {
    type: String,
    default: null,
  },
  profileViews: {
    type: Number,
    default: 0,
  },
  location: {
    homeLocation: {
      latitude: {
        type: String,
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
          type: String,
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
    type: String, // Male, Female, Transgender
    default: null,
  },
  userImageURL: {
    type: String,
    default: 'https://s3.ap-south-1.amazonaws.com/shubhammore.developer/shared/no_user.jpg',
  },
  userCoverImageURL: {
    type: String,
    default: 'https://s3.ap-south-1.amazonaws.com/shubhammore.developer/shared/cover-image.jpg',
  },
  userImage: {
    imageName: {
      type: String,
    },
    secureUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },
  userCoverImage: {
    imageName: {
      type: String,
    },
    secureUrl: {
      type: String,
    },
    publicUd: {
      type: String,
    },
    createAt: {
      type: Date,
    },
  },
  userProvider: {
    type: String, // Google, Sportizen
    required: true,
  },
  userAchievements: [
    {
      achievement: {
        type: String,
      },
    },
  ],
});

userProfileSchema.methods.toJSON = function () {
  const userProfile = this;
  const userProfileObject = userProfile.toObject();

  delete userProfileObject.__v;

  return userProfileObject;
};

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
