const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  senderDelete: {
    type: Boolean,
    default: false,
  },
  receiverDelete: {
    type: Boolean,
    default: false,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
