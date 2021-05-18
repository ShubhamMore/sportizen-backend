const mongoose = require('mongoose');
const validator = require('validator');

const bookmarkBlogSchema = new mongoose.Schema({
  blog: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  bookmarkBlog: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

bookmarkBlogSchema.methods.toJSON = function () {
  const bookmarkBlog = this;
  const bookmarkBlogObject = bookmarkBlog.toObject();

  delete bookmarkBlogObject.__v;

  return bookmarkBlogObject;
};

const bookmarkBlog = mongoose.model('bookmarkBlog', bookmarkBlogSchema);

module.exports = bookmarkBlog;
