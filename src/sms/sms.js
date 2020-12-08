const Nexmo = require('nexmo');

const sendSMS = async (sms) => {
  const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_SMS_API_KEY,
    apiSecret: process.env.NEXMO_SMS_API_SECRET,
  });

  await nexmo.message.sendSms(sms.from, sms.to, sms.message);
};

module.exports = sendSMS;
