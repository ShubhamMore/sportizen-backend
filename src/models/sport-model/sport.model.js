const mongoose = require('mongoose');
const validator = require('validator');

const sportSchema = new mongoose.Schema({
  sportName: {
    type: String,
    required: true,
  },
  sportDetails: {
    type: String,
  },
});

sportSchema.methods.toJSON = function () {
  const sport = this;
  const sportObject = sport.toObject();

  delete sportObject.__v;

  return sportObject;
};

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
