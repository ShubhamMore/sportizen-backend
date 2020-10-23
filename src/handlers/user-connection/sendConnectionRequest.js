const UserProfile = require('../../models/user-profile.model');
const UserConnection = require('../../models/user-connection.model');

const sendConnectionRequest = async (req, res) => {
  try {
    const followedUser = await UserProfile.findById(req.body.followedUser, { accountType: 1 });

    const status = 'following';

    if (followedUser.accountType === 'private') {
      status = 'requested';
    }

    const newUserConnection = UserConnection({
      primaryUser: req.user._id,
      followedUser: req.body.requestedUser,
      status,
    });

    await newUserConnection.save();

    res.status(200).send({ status });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = sendConnectionRequest;
