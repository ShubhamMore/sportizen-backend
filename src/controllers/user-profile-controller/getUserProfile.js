const UserProfile = require('../../models/user-model/user-profile.model');
const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserProfile = async (req, res) => {
  try {
    const sportizenId = req.body.sportizenId ? req.body.sportizenId : req.param.id;

    const userSportizenId = req.user ? req.user.sportizenId : '';

    // get Requested User Profile
    const userProfile = await UserProfile.findOne({ sportizenId });

    if (!userProfile) {
      throw new Error('User Not Found');
    }

    // get connection between me (primary User) and requested user

    const userConnection = await UserConnection.findOne({
      primaryUser: userSportizenId,
      followedUser: sportizenId,
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

      responseHandler(privateUser, 200, req, res);
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

      responseHandler(publicUser, 200, req, res);
    }
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getUserProfile;
