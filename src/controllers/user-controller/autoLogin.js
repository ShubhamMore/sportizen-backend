const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const autoLogin = async (req, res) => {
  try {
    responseHandler({ authenticated: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = autoLogin;
