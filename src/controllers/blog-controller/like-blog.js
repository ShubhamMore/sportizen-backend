const Blog = require('../../models/blog-model/blog-model');

const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.body.blog, {
      $addToSet: {
        likedBy: req.user.sportizenId,
      },
    });

    if (!blog) {
      throw new Error("Blog doesn't Exists");
    }

    responseHandler({ success: true }, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = likeBlog;
