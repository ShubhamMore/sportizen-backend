const User = require('../../models/user.model');

const changePassword = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    if (!user) {
      throw new Error();
    }

    user.password = req.body.newPassword;

    await user.save();

    res.send({ success: true });
  } catch (e) {
    res.status(400).send('Old Password Does not Match, Please Try Again');
  }
};

module.exports = changePassword;
