const UserProfile = require('../../models/user-profile.model');
const UserConnection = require('../../models/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const sendConnectionRequest = async (req, res) => {
  try {
    const followedUser = await UserProfile.findOne(
      { sportizenId: req.body.followedUser },
      { accountType: 1 }
    );

    let status = 'following';

    if (followedUser && followedUser.accountType === 'private') {
      status = 'requested';
    }

    const newUserConnection = UserConnection({
      primaryUser: req.user.sportizenId,
      followedUser: req.body.followedUser,
      status,
    });

    await newUserConnection.save();

    responseHandler({ status }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = sendConnectionRequest;
