const UserConnection = require('../../models/user-connection.model');
const UserProfile = require('../../models/user-profile.model');

const getBlockedConnections = async (req, res) => {
  try {
    const userConnection = await UserConnection.find({
      primaryUser: req.user._id,
      status: 'blocked',
    });

    if (!userConnection) {
      throw new Error('');
    }
    res.send(userConnection);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getBlockedConnections;
