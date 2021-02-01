const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.user.blogId);

    if (!blog) {
      throw new Error('Blog Not Found');
    }

    if (!blog.sportizenUser.equals(req.user.sportizenId)) {
      throw new Error('Cant access this Blog');
    }

    await Blog.findByIdAndUpdate(req.body._id, {
      blogTitle: req.body.blogTitle,
      blogSubtitle: req.body.blogSubtitle,
      blogDescription: req.body.blogDescription,
      viewTime: req.body.viewTime,
      tags: req.body.tags,
    });

    responseHandler({ success: true }, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = updateBlog;
