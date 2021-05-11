const User = require('../../models/user-model/user.model');

const jwt = require('jsonwebtoken');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const validateToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': req.body.token,
    });

    if (!user) {
      throw new Error('Invalid Token');
    }

    const data = {
      valid_token: true,
    };

    responseHandler(data, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = validateToken;
