const User = require('../../models/user-model/user.model');
const UserProfile = require('../../models/user-model/user-profile.model');

const jwt = require('jsonwebtoken');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const setPassword = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error('No user Found');
    }

    user.password = req.body.password;

    await user.save();
    await UserProfile.findOneAndUpdate({ email: user.email }, { userProvider: 'SPORTIZEN' });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = setPassword;
