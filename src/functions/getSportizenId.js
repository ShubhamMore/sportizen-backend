const SportizenId = require('../models/sportizen-id.model');

const getSportizenId = async (name) => {
  try {
    let sportizenId = await SportizenId.findOne();

    if (!sportizenId) {
      sportizenId = new SportizenId();
      await sportizenId.save();
    }

    const id = +sportizenId.sportizen + 1;

    await SportizenId.findByIdAndUpdate(sportizenId._id, { sportizen: id });

    const padLength =
      id.toString().length > 5
        ? sportizenId
        : !(5 - id.toString().length <= 0)
        ? 5 - id.toString().length
        : 0;

    const newSportizenId =
      name.toLowerCase().replace(' ', '') + id.toString().padStart(padLength, '0');

    return newSportizenId;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = getSportizenId;
