const mongoose = require('mongoose');
const validator = require('validator');

const replyCommentSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  replyComment: {
    type: String,
    required: true,
  },
});

replyCommentSchema.methods.toJSON = function () {
  const replyComment = this;
  const replyCommentObject = replyComment.toObject();

  delete replyCommentObject.__v;

  return replyCommentObject;
};

const ReplyComment = mongoose.model('ReplyComment', replyCommentSchema);

module.exports = ReplyComment;
