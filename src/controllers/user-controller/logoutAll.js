const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = logoutAll;
