const UserProfile = require('../../models/user-model/user-profile.model');
const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const sendConnectionRequest = async (req, res) => {
  try {
    if (req.user.sportizenId === req.body.followedUser) {
      throw new Error(`Cant send request`);
    }

    const connection = await UserConnection.findOne({
      primaryUser: req.user.sportizenId,
      followedUser: req.body.followedUser,
    });

    if (connection) {
      throw new Error(`Already ${connection.status} this user`);
    }

    const followedUser = await UserProfile.findOne(
      { sportizenId: req.body.followedUser },
      { accountType: 1 }
    );

    let status = 'following';

    if (followedUser && followedUser.accountType === 'private') {
      status = 'requested';
    }

    const newUserConnection = new UserConnection({
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
