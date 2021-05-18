const mongoose = require('mongoose');
const validator = require('validator');

const postReplyCommentLikeSchema = new mongoose.Schema({
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

postReplyCommentLikeSchema.methods.toJSON = function () {
  const postReplyCommentLike = this;
  const postReplyCommentLikeObject = postReplyCommentLike.toObject();

  delete postReplyCommentLikeObject.__v;

  return postReplyCommentLikeObject;
};

const PostReplyCommentLike = mongoose.model('PostReplyCommentLike', postReplyCommentLikeSchema);

module.exports = PostReplyCommentLike;
