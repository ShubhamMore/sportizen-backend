const mongoose = require('mongoose');
const validator = require('validator');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  eventType: {
    type: String,
  },
  sport: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  teams: [String],
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  registerTill: {
    type: String,
    required: true,
  },
  // time: {
  //   type: String,
  //   required: true,
  // },
  lattitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  winning_price: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  players: [
    {
      name: {
        type: String,
      },
      contact: {
        type: String,
      },
    },
  ],
  noOfPlayers: {
    type: String,
  },
  teams: [
    {
      teamName: {
        type: String,
      },
      teamMembers: [
        {
          name: {
            type: String,
          },
          contact: {
            type: String,
          },
        },
      ],
    },
  ],
  images: [
    {
      image_name: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        required: true,
      },
    },
  ],
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
