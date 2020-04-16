const User = require('../../models/user.model');
const UserProfile = require('../../models/user-profile.model');
const noUser = require('../../shared/user.image');
const newUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const userProfile = new UserProfile({
      name: user.name,
      email: user.email,
      userImage: noUser,
    });
    await user.save();
    await userProfile.save();
    const token = await user.generateAuthToken();
    const data = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      token,
      expiresIn: 1800,
    };
    res.status(201).send(data);
  } catch (e) {
    let err = 'Something bad happend' + e;
    if (e.code == 11000) {
      err = 'User alredy register, Please login';
    }
    res.status(400).send(err);
  }
};

module.exports = newUser;
