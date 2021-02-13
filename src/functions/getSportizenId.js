const SportizenId = require('../models/user-model/sportizen-id.model');

const getRandomString = () => {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomString;
};

const getSportizenId = async (name) => {
  try {
    let sportizenId = await SportizenId.findOne();

    if (!sportizenId) {
      sportizenId = new SportizenId();
      await sportizenId.save();
    }

    const id = +sportizenId.sportizen + 1;

    await SportizenId.findByIdAndUpdate(sportizenId._id, { sportizen: id });

    const newSportizenId = name.toLowerCase().replace(' ', '') + getRandomString() + id.toString();

    return newSportizenId;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = getSportizenId;
