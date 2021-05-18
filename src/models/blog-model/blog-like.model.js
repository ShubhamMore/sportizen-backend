const mongoose = require('mongoose');
const validator = require('validator');

const blogLikeSchema = new mongoose.Schema({
  blog: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  blogLike: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

blogLikeSchema.methods.toJSON = function () {
  const blogLike = this;
  const blogLikeObject = blogLike.toObject();

  delete blogLikeObject.__v;

  return blogLikeObject;
};

const BlogLike = mongoose.model('BlogLike', blogLikeSchema);

module.exports = BlogLike;
