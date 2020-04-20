const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const UserProfile = require('../../models/user-profile.model');

const setPassword = async (req, res) => {
  try {
    console.log('x');

    const user = req.user;

    if (!user) {
      throw new Error('No user Found');
    }

    user.password = req.body.password;

    await user.save();
    await UserProfile.findOneAndUpdate({ email: user.email }, { userProvicer: 'SPORTIZEN' });

    res.send();
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = setPassword;
