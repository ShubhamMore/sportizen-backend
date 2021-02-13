const User = require('../../models/user-model/user.model');
const UserProfile = require('../../models/user-model/user-profile.model');

const getSportizenId = require('../../functions/getSportizenId');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const verify = require('../../functions/OAuth/auth.verify');

const newGoogleUser = async (req, res) => {
  try {
    const verifyData = await verify(req.body.idToken);

    if (verifyData.email === req.body.email) {
      const sportizenId = await getSportizenId(req.body.name);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        sportizenId: sportizenId,
        password: req.body.password,
        userType: req.body.userType,
      });

      const userProfile = new UserProfile({
        name: user.name,
        email: user.email,
        sportizenId: sportizenId,
        userImageURL: req.body.userImageURL,
        userProvider: 'GOOGLE',
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
    } else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, res);
  }
};

module.exports = newGoogleUser;
