const User = require('../../models/user.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const changePassword = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    if (!user) {
      throw new Error();
    }

    user.password = req.body.newPassword;

    await user.save();

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = changePassword;
