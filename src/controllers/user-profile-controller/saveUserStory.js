const UserProfile = require('../../models/user-model/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserStory = async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndUpdate(req.body._id, {
      story: req.body.story,
    });

    userProfile.story = req.body.story;

    responseHandler(userProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = saveUserStory;
