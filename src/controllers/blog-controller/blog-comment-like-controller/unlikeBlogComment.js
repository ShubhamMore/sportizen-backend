const BlogCommentLike = require('../../../models/blog-model/blog-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const unlikeBlogComment = async (req, res) => {
  try {
    const blogCommentLike = await BlogCommentLike.findOneAndDelete({
      blog: req.body.blog,
      comment: req.body.comment,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = unlikeBlogComment;
