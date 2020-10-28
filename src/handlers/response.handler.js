const responseHandler = async (response, status, res) => {
  try {
    status = status ? status : 200;
    res.status(status).send(response);
  } catch (error) {
    let err = '' + error;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = responseHandler;
