const UserProfile = require('../../models/user-profile.model');

const getUserProfile = async (req, res) => {
  try {
    const email = req.body.id;
    const userProfile = await UserProfile.findOne({ email });
    if (!userProfile) {
      throw new Error('');
    }
    res.send(userProfile);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getUserProfile;
