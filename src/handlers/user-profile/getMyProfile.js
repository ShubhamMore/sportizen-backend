const UserProfile = require('../../models/user-profile.model');

const getMyProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const userProfile = await UserProfile.findOne({ email });
    if (!userProfile) {
      throw new Error('Profile Not Found');
    }
    res.send(userProfile);
  } catch (e) {
    console.log(e);
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getMyProfile;
