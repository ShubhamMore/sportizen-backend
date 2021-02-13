const User = require('../../models/user-model/user.model');
const UserProfile = require('../../models/user-model/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    const token = await user.generateAuthToken();

    const data = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      sportizenId: user.sportizenId,
      token,
      expiresIn: 3600,
    };

    const userProfile = await UserProfile.findOne({ email: data.email });

    data._id = userProfile._id;

    responseHandler(data, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = login;
