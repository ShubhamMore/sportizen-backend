const User = require('../../models/user-model/user.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const sendMail = require('../../email/mail');

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('No user Found..');
    }

    const token = await user.generateAuthToken();

    const link = process.env.MAIL_URI + '/#/reset-password?key=' + token;

    const mail = {
      to: user.email,
      from: process.env.REPLY_EMAIL,
      subject: `Reset Password Link for ${process.env.SITE_NAME}`,
      text: '',
      html: `<p>Click following link to reset your password </p><br><a href='${link}'>${link}</a>`,
    };

    await sendMail(mail);

    responseHandler({ data: 'success' }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = forgotPassword;
