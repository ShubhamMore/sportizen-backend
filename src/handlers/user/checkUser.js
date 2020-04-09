const User = require('../../models/user.model');

const checkUser = async (req, res) => {
  try {
    let exist = false;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      exist = true;
    }
    res.status(201).send({ exist });
  } catch (e) {
    let err = '' + e;
    if (e.code == 11000) {
      err = 'User alredy register, Please login';
    }
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = checkUser;
