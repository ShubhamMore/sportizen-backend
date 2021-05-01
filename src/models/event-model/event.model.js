const mongoose = require('mongoose');
const validator = require('validator');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  eventType: {
    type: String, // Tournament, Podcast, Live
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  registrationType: {
    type: String, // Individual, Team
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  registerTill: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [Number],
  },
  description: {
    type: String,
    required: true,
  },
  winningPrice: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  noOfPlayers: {
    type: Number,
    required: true,
  },
  images: [
    {
      imageName: {
        type: String,
        required: true,
      },
      secureUrl: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
