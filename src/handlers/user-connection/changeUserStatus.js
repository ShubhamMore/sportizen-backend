const UserConnection = require('../../models/user-connection.model');

const changeUserStatus = async (req, res) => {
  try {
    const userConnection = await UserConnection.findOneAndUpdate(
      {
        primaryUser: req.user._id,
        followedUser: req.body.followedUser,
      },
      { status: req.body.status }
    );
    if (!userConnection) {
      throw new Error('');
    }
    res.send(userConnection);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = changeUserStatus;
