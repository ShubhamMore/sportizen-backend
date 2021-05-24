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
  description: {
    type: String,
    required: true,
  },
  winningPrice: {
    type: Number,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  noOfRegistrations: {
    type: Number,
    required: true,
  },
  noOfPlayers: {
    type: Number,
    default: null,
  },
  durationType: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    default: null,
  },
  registerTill: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: null,
  },
  locationType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [Number],
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
  status: {
    type: Boolean,
    default: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
