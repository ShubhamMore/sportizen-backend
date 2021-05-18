const mongoose = require('mongoose');
const validator = require('validator');

const postBookmarkSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  bookmark: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

postBookmarkSchema.methods.toJSON = function () {
  const postBookmark = this;
  const postBookmarkObject = postBookmark.toObject();

  delete postBookmarkObject.__v;

  return postBookmarkObject;
};

const PostBookmark = mongoose.model('PostBookmark', postBookmarkSchema);

module.exports = PostBookmark;
