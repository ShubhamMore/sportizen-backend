const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
  sportizenUser: {
    type: String,
    required: true,
  },
  postType: {
    type: String, // Text, Image, Video, shared
    required: true,
  },
  sharedPost: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  fileName: {
    type: String, // for image & video
    default: '',
  },
  secureUrl: {
    type: String,
    default: '',
  },
  publicId: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  modifiedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  visibility: {
    type: String, // All, My Connections, Only Me
    default: 'all',
  },
});

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();

  delete postObject.__v;

  return postObject;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
