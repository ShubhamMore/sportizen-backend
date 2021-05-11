const jwt = require('jsonwebtoken');
const User = require('../models/user-model/user.model');

const errorHandler = require('./../handlers/error.handler');

const adminAuth = async (req, res, next) => {
  try {
    if (req.user.userType !== 'admin') {
      throw new Error();
    }
    next();
  } catch (e) {
    errorHandler('Invalid Access.', 401, req, res);
  }
};

module.exports = adminAuth;
