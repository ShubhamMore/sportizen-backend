const UserConnection = require('../../models/user-connection.model');

const changeUserStatus = async (req, res) => {
  try {
    const userConnection = await UserConnection.findOneAndUpdate(
      {
        $or: [{ firstUser: req.user._id }, { secondUser: req.user._id }],
      },
      { actionedUser: req.user._id, status: req.body.status }
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
