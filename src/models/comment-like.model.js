const mongoose = require('mongoose');
const validator = require('validator');

const commentLikeSchema = new mongoose.Schema({
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
  commentLike: {
    type: Boolean,
    default: true,
  },
});

commentLikeSchema.methods.toJSON = function () {
  const commentLike = this;
  const commentLikeObject = commentLike.toObject();

  delete commentLikeObject.__v;

  return commentLikeObject;
};

const CommentLike = mongoose.model('CommentLike', commentLikeSchema);

module.exports = CommentLike;
