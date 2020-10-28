const UserProfile = require('../../models/user-profile.model');
const UserConnection = require('../../models/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.body.id);

    if (!userProfile) {
      throw new Error('User Not Found');
    }

    let userConnection;

    if (userProfile.accountType === 'private') {
      userConnection = await UserConnection.findOne({ primaryUser: req.user._id });
    }

    if (
      !userConnection ||
      userConnection.status !== 'following' ||
      userProfile.accountType === 'private'
    ) {
      const message = { message: 'This Account is Private' };
      responseHandler(message, 200, res);
    } else {
      responseHandler(userProfile, 200, res);
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserProfile;
