const User = require('../../models/user.model');
const UserProfile = require('../../models/user-profile.model');

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    const token = await user.generateAuthToken();

    const data = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
      token,
      expiresIn: 3600,
    };

    const userProfile = await UserProfile.findOne({ email: data.email });

    data._id = userProfile._id;

    res.send(data);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = login;
