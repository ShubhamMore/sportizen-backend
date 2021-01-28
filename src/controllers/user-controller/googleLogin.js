const User = require('../../models/user-model/user.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const verify = require('../../functions/OAuth/auth.verify');

const googleLogin = async (req, res) => {
  try {
    const verifyData = await verify(req.body.idToken);

    if (verifyData.email === req.body.email) {
      const user = await User.findByEmail(req.body.email);

      const token = await user.generateAuthToken();

      const data = {
        _id: user._id,
        email: user.email,
        userType: user.userType,
        sportizenId: user.sportizenId,
        token,
        expiresIn: 3600,
      };

      responseHandler(data, 200, res);
    } else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = googleLogin;
