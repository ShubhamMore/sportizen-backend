const BlogView = require('../../models/blog-model/blog-view.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const viewBlog = async (req, res) => {
  try {
    let blogView = await BlogView.findOne({
      blog: req.body.blog,
      sportizenUser: req.user.sportizenId,
    });

    if (!blogView) {
      blogView = new BlogView({
        blog: req.body.blog,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await blogView.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = viewBlog;
