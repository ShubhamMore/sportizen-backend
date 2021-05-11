const jwt = require('jsonwebtoken');
const User = require('../models/user-model/user.model');
const UserProfile = require('../models/user-model/user-profile.model');

const errorHandler = require('./../handlers/error.handler');

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    errorHandler('Please authenticate.', 401, req, res);
  }
};

module.exports = userAuth;
