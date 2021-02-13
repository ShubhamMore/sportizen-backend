const UserProfile = require('../../models/user-model/user-profile.model');
const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserProfile = async (req, res) => {
  try {
    // get Requested User Profile
    const userProfile = await UserProfile.findOne({ sportizenId: req.body.sportizenId });

    if (!userProfile) {
      throw new Error('User Not Found');
    }

    // get connection between me (primary User) and requested user

    const userConnection = await UserConnection.findOne({
      primaryUser: req.user.sportizenId,
      followedUser: req.body.sportizenId,
    });

    const connection =
      userConnection && userConnection.status ? userConnection.status : 'not-connected';

    if (connection !== 'following' && userProfile.accountType === 'private') {
      const privateUser = {
        name: userProfile.name,
        accountType: userProfile.accountType,
        userImageURL: userProfile.userImageURL,
        userCoverImageURL: userProfile.userCoverImageURL,
        email: userProfile.email,
        sportizenId: userProfile.sportizenId,
        connection,
      };

      responseHandler(privateUser, 200, res);
    } else {
      const publicUser = {
        name: userProfile.name,
        accountType: userProfile.accountType,
        userImageURL: userProfile.userImageURL,
        userCoverImageURL: userProfile.userCoverImageURL,
        email: userProfile.email,
        sportizenId: userProfile.sportizenId,
        connection,
      };

      responseHandler(publicUser, 200, res);
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserProfile;
