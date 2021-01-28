const User = require('../../models/user-model/user.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const checkUser = async (req, res) => {
  try {
    let exist = false;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      exist = true;
    }

    responseHandler({ exist }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = checkUser;
