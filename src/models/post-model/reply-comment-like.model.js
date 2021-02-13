const mongoose = require('mongoose');
const validator = require('validator');

const replyCommentLikeSchema = new mongoose.Schema({
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
  replyCommentLike: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

replyCommentLikeSchema.methods.toJSON = function () {
  const replyCommentLike = this;
  const replyCommentLikeObject = replyCommentLike.toObject();

  delete replyCommentLikeObject.__v;

  return replyCommentLikeObject;
};

const ReplyCommentLike = mongoose.model('ReplyCommentLike', replyCommentLikeSchema);

module.exports = ReplyCommentLike;
