const User = require('../../models/user.model');
const UserProfile = require('../../models/user-profile.model');

const getSportizenId = require('../../functions/getSportizenId');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const noUser = require('../../shared/user.image');

const newUser = async (req, res) => {
  try {
    const sportizenId = await getSportizenId(req.body.name);
    req.body.sportizenId = sportizenId;

    const user = new User(req.body);

    const userProfile = new UserProfile({
      name: user.name,
      email: user.email,
      sportizenId: sportizenId,
      userImage: noUser,
      userImageURL: noUser.secure_url,
      userProvider: 'SPORTIZEN',
    });

    await user.save();
    await userProfile.save();

    const token = await user.generateAuthToken();

    const data = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      sportizenId: user.sportizenId,
      token,
      expiresIn: 1800,
    };

    responseHandler(data, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = newUser;
