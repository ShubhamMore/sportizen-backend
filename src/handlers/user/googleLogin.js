const User = require('../../models/user.model');

const verify = require('../../functions/OAuth/auth.verify');

const googleLogin = async (req, res) => {
  try {
    const verifyData = await verify(req.body.idToken);

    if (verifyData.email === req.body.email) {
      const user = await User.findByEmail(req.body.email);

      const token = await user.generateAuthToken();

      const data = {
        _id: user._id,
        email: user.email,
        userType: user.userType,
        token,
        expiresIn: 3600,
      };

      res.status(200).send(data);
    } else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    let err = '' + e;

    if (err.includes('Invalid token signature')) {
      err = 'Invalid Token Signature';
    }

    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = googleLogin;
