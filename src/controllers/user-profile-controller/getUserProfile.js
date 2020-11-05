const UserProfile = require('../../models/user-profile.model');
const UserConnection = require('../../models/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserProfile = async (req, res) => {
  try {
    // get Requested User Profile

    const userProfile = await UserProfile.findById(req.body.id);

    if (!userProfile) {
      throw new Error('User Not Found');
    }

    // get connection between me (primary User) and requested user

    const userConnection = await UserConnection.findOne({
      primaryUser: req.user._id,
      followedUser: req.body.id,
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
      const user = {
        ...userProfile,
        connection,
      };

      responseHandler(user, 200, res);
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserProfile;
