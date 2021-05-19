const BlogCommentLike = require('../../../models/blog-model/blog-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const likeBlogComment = async (req, res) => {
  try {
    let blogCommentLike = await BlogCommentLike.findOne({
      blog: req.body.blog,
      comment: req.body.comment,
      sportizenUser: req.user.sportizenId,
    });

    if (!blogCommentLike) {
      blogCommentLike = new BlogCommentLike({
        blog: req.body.blog,
        comment: req.body.comment,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await blogCommentLike.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = likeBlogComment;
