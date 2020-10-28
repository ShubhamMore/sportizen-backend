const UserConnection = require('../../models/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getBlockedConnections = async (req, res) => {
  try {
    const userConnection = await UserConnection.find({
      primaryUser: req.user._id,
      status: 'blocked',
    });

    if (!userConnection) {
      throw new Error('');
    }

    responseHandler(userConnection, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getBlockedConnections;
