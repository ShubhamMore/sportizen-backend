const mongoose = require('mongoose');
const validator = require('validator');

const blogCommentLikeSchema = new mongoose.Schema({
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
  blogCommentLike: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

blogCommentLikeSchema.methods.toJSON = function () {
  const blogCommentLike = this;
  const blogCommentLikeObject = blogCommentLike.toObject();

  delete blogCommentLikeObject.__v;

  return blogCommentLikeObject;
};

const BlogCommentLike = mongoose.model('BlogCommentLike', blogCommentLikeSchema);

module.exports = BlogCommentLike;
