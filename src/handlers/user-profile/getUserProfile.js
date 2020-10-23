const UserProfile = require('../../models/user-profile.model');

const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.body.id);
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
