const getUserProfile = {
  properties: {
    sportizenId: {
      type: 'string',
    },
  },
};
const getMyProfile = {};
const saveUserProfile = {};
const saveProfileImage = {};
const saveCoverImage = {};
const saveUserStory = {
  properties: {
    _id: {
      type: 'string',
    },
    story: {
      type: 'string',
    },
  },
  required: ['_id', 'story'],
};

module.exports = {
  getUserProfile,
  getMyProfile,
  saveUserProfile,
  saveProfileImage,
  saveCoverImage,
  saveUserStory,
};
