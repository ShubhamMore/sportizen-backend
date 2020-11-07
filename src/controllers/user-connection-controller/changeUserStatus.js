const UserConnection = require('../../models/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const changeUserStatus = async (req, res) => {
  try {
    const userConnection = await UserConnection.findOneAndUpdate(
      {
        primaryUser: req.user.sportizenId,
        followedUser: req.body.followedUser,
      },
      { status: req.body.status }
    );

    if (!userConnection) {
      throw new Error('');
    }

    responseHandler(userConnection, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = changeUserStatus;
