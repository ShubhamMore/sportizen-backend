const UserProfile = require('../../models/user-profile.model');
const UserConnection = require('../../models/user-connection.model');

const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.body.id);

    if (!userProfile) {
      throw new Error('User Not Found');
    }

    let userConnection;

    if (userProfile.accountType === 'private') {
      userConnection = await UserConnection.findOne({ primaryUser: req.user._id });
    }

    if (
      !userConnection ||
      userConnection.status !== 'following' ||
      userProfile.accountType === 'private'
    ) {
      res.send({ message: 'This Account is Private' });
    } else {
      res.send(userProfile);
    }
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getUserProfile;
