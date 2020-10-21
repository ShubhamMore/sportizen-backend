const UserConnection = require('../../models/user-connection.model');

const getMyConnectionRequests = async (req, res) => {
  try {
    const userConnection = await UserConnection.find({
      primaryUser: req.user._id,
      status: 'requested',
    });

    res.send(userConnection);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getMyConnectionRequests;
