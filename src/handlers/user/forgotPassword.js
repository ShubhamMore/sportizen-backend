const User = require('../../models/user.model');
const sendMail = require('../../email/mail');

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('No user Found..');
    }

    const token = await user.generateAuthToken();

    const link = process.env.MAIL_URI + '/#/resetPassword?key=' + token;

    const mail = {
      to: user.email,
      from: process.env.REPLY_EMAIL,
      subject: `Reset Password Link for ${process.env.SITE_NAME}`,
      text: '',
      html: `<p>Click following link to reset your password </p><br><a href='${link}'>${link}</a>`,
    };

    await sendMail(mail);

    res.status(200).send({ data: 'success' });
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = forgotPassword;
