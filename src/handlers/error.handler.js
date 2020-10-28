const errorHandler = async (error, status, res) => {
  try {
    let err = '' + error;
    if (error.name === 'CastError') {
      err = 'No Record Found';
    } else if (err.includes('Invalid token signature')) {
      err = 'Invalid Token Signature';
    } else if (error.code === 11000) {
      err = 'Duplicate key error';
    }
    err = err ? err.replace('Error: ', '') : 'Something Bad Happen, Bad request';
    status = status ? status : 400;
    res.status(status).send(err);
  } catch (error) {
    let err = '' + error;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = errorHandler;
