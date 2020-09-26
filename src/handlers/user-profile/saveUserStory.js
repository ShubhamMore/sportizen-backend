const UserProfile = require('../../models/user-profile.model');

const saveUserStory = async (req, res) => {
  try {
    console.log(req.body);
    const userProfile = await UserProfile.findByIdAndUpdate(req.body._id, {
      story: req.body.story,
    });

    res.send(userProfile);
  } catch (e) {
    console.log(e);
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = saveUserStory;
