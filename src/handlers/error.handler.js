const logger = require('../config/logger');

const errorHandler = async (error, status, req, res) => {
  try {
    logger.log('error', {
      sportizenId: req.user ? req.user.sportizenId : '',
      body: req.body,
      error,
      stackTrace: error.stack,
    });

    // console.log({
    //   sportizenId: req.user ? req.user.sportizenId : '',
    //   body: req.body,
    //   error,
    //   stackTrace: error.stack,
    // });

    let err = '' + error;
    if (error.name === 'CastError') {
      err = 'No Record Found';
    } else if (err.includes('Invalid token signature')) {
      err = 'Invalid Token Signature';
    } else if (error.code === 11000) {
      err = 'Duplicate key error';
    }

    err = err ? err.replace('Error: ', '') : 'Something Bad Happen, Bad request';

    res.status(status || 400).send(err);
  } catch (error) {
    logger.log('error', {
      sportizenId: req.user ? req.user.sportizenId : '',
      body: req.body,
      error,
      stackTrace: error.stack,
    });
    res.status(error.status || 400).send(error);
  }
};

module.exports = errorHandler;
