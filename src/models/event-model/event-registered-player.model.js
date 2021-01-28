const mongoose = require('mongoose');
const validator = require('validator');

const eventRegisteredPlayerSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  contact: {
    type: String,
    required: true,
  },
});

eventRegisteredPlayerSchema.methods.toJSON = function () {
  const eventRegisteredPlayer = this;
  const eventRegisteredPlayerObject = eventRegisteredPlayer.toObject();

  delete eventRegisteredPlayerObject.__v;

  return eventRegisteredPlayerObject;
};

const EventRegisteredPlayer = mongoose.model('EventRegisteredPlayer', eventRegisteredPlayerSchema);

module.exports = EventRegisteredPlayer;
