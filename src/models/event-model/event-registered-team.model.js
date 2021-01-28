const mongoose = require('mongoose');
const validator = require('validator');

const eventRegisteredTeamSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamMembers: [
    {
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
    },
  ],
});

eventRegisteredTeamSchema.methods.toJSON = function () {
  const eventRegisteredTeam = this;
  const eventRegisteredTeamObject = eventRegisteredTeam.toObject();

  delete eventRegisteredTeamObject.__v;

  return eventRegisteredTeamObject;
};

const EventRegisteredTeam = mongoose.model('EventRegisteredTeam', eventRegisteredTeamSchema);

module.exports = EventRegisteredTeam;
