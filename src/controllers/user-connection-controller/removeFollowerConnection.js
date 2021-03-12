const UserConnection = require('../../models/user-connection-model/user-connection.model');

const mongoose = require('mongoose');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const removeFollowerConnection = async (req, res) => {
  try {
    const myFollower = await UserConnection.findOneAndDelete({
      primaryUser: req.body.primaryUser,
      followedUser: req.user.sportizenId,
      status: 'following',
    });

    if (!myFollower) {
      throw new Error('The User never followed You');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = removeFollowerConnection;
