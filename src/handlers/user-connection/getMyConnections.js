const UserConnection = require('../../models/user-connection.model');
const UserProfile = require('../../models/user-profile.model');

const getMyConnections = async (req, res) => {
  try {
    const userConnection = await UserConnection.find({
      $or: [{ firstUser: req.user._id }, { secondUser: req.user._id }],
      status: 'connected',
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

module.exports = getMyConnections;
