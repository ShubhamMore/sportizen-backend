const UserProfile = require('../../models/user-model/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ email: req.user.email });

    if (!userProfile) {
      throw new Error('Profile Not Found');
    }

    responseHandler(userProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyProfile;
