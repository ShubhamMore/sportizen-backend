const BlogComment = require('../../models/blog-model/blog-comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addBlogComment = async (req, res) => {
  try {
    blogComment = new BlogComment({
      blog: req.body.blog,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
    });

    await blogComment.save();

    responseHandler(blogComment, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addBlogComment;
