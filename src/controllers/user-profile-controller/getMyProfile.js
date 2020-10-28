const UserProfile = require('../../models/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const userProfile = await UserProfile.findOne({ email });
    if (!userProfile) {
      throw new Error('Profile Not Found');
    }

    responseHandler(userProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyProfile;
