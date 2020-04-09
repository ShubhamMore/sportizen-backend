const mongoose = require('mongoose');
const validator = require('validator');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sport: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  teams: [
    {
      team: {
        type: String,
        required: true
      }
    }
  ],
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  lattitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String, 
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      image_name: {
        type: String,
        required: true
      },
      secure_url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        required: true
      }
    }
  ],
  created_at: {
    type: Date,
    required: true
  },
  modified_at: {
    type: Date,
    required: true
  }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
  