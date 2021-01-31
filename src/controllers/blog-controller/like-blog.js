const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const likeBlog = async (req, res) => {
  try {
    const blogExists = await Blog.findOne({
      _id: req.body.blogId,
    });
    if (!blogExists) {
      throw new Error('Blog doesnt Exists');
    }

    const blogUpdate = await Blog.update(
      {
        _id: req.body.blogId,
      },
      {
        $addToSet: {
          likedBy: req.user.sportizenId,
        },
      }
    );

    responseHandler(blogUpdate, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = likeBlog;
