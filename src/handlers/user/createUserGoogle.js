const User = require('../../models/user.model');
const UserProfile = require('../../models/user-profile.model');

const verify = require('../../functions/OAuth/auth.verify');

const newGoogleUser = async (req, res) => {
  try {
    const verifyData = await verify(req.body.idToken);

    if (verifyData.email === req.body.email) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
      });
      const userProfile = new UserProfile({
        name: user.name,
        email: user.email,
        userImageURL: req.body.userImageURL,
        userProvider: 'GOOGLE',
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
    } else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    let err = '' + e;

    if (err.includes('Invalid token signature')) {
      err = 'Invalid Token Signature';
    }

    if (e.code == 11000) {
      err = 'User already register, Please login';
    }

    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = newGoogleUser;
