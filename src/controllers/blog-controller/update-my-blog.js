const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.find({
      _id: req.user.blogId,
    });
    if (!blog.sportizenUser.equals(req.user._id)) throw new Error('Cant access this Blog');

    const update = await Blog.update(
      {
        _id: req.body._id,
      },
      {
        blogTitle: req.body.blogTitle,
        blogSubtitle: req.body.blogSubtitle,
        blogDescription: req.body.blogDescription,
        viewTime: req.body.viewTime,
        tags: req.body.tags,
      }
    );

    responseHandler(update, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = updateBlog;
