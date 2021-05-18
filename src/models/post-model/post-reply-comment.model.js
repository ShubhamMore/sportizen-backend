const mongoose = require('mongoose');
const validator = require('validator');

const postReplyCommentSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

postReplyCommentSchema.methods.toJSON = function () {
  const postReplyComment = this;
  const postReplyCommentObject = postReplyComment.toObject();

  delete postReplyCommentObject.__v;

  return postReplyCommentObject;
};

const PostReplyComment = mongoose.model('PostReplyComment', postReplyCommentSchema);

module.exports = PostReplyComment;
