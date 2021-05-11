// const logger = require('./../config/logger');
const errorHandler = require('./error.handler');

const responseHandler = async (response, status, req, res) => {
  try {
    res.status(status || 200).send(response);
  } catch (error) {
    errorHandler(error, error.status, req, res);
  }
};

module.exports = responseHandler;
