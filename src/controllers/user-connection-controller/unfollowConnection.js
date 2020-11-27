const UserConnection = require('../../models/user-connection.model');

const mongoose = require('mongoose');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const unfollowConnection = async (req, res) => {
  try {
    const myFollower = await UserConnection.deleteOne({
      primaryUser: req.user.sportizenId,
      followedUser: req.body.followedUser,
      status: 'following',
    });

    responseHandler(myFollower, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = unfollowConnection;
