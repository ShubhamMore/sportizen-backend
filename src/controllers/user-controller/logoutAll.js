const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = logoutAll;
