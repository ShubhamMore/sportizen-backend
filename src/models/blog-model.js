const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  sportizenUser: {
    type: String,
    required: true,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogSubtitle: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
    required: true,
  },

  images: [
    {
      imageName: {
        type: String, // for image & video
        default: null,
      },
      secureUrl: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
        default: new Date().toISOString(),
      },
      position: {
        type: Number,
        required: true,
      },
    },
  ],

  tags: [{ type: Array, validate: [arrayLimit, 'length of tag exceeds 5'] }],
  viewTime: {
    type: Number,
    required: true,
  },

  views: {
    type: Number,
    required: true,
    default: true,
  },
  likes: [{ type: String }],

  comments: [
    {
      commentedBy: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      commentedAt: {
        type: String,
        required: true,
      },
    },
  ],

  bookmarkUser: [
    {
      type: Array,
    },
  ],
});

function arrayLimit(val) {
  return val.length <= 5;
}

blogSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();

  delete postObject.__v;

  return postObject;
};

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
