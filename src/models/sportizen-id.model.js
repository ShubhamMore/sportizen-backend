const mongoose = require('mongoose');
const validator = require('validator');

const sportizenIdSchema = new mongoose.Schema({
  sportizen: {
    type: Number,
    default: 0,
  },
});

const SportizenId = mongoose.model('SportizenId', sportizenIdSchema);

module.exports = SportizenId;
