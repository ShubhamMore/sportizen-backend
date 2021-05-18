const BlogComment = require('../../models/blog-model/blog-comment.model');
const BlogCommentLike = require('../../models/blog-model/blog-comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const removeBlogComment = async (req, res) => {
  try {
    const blogComment = await BlogComment.findByIdAndDelete(req.body.id);

    if (!blogComment) {
      throw new Error('Blog Comment not Found');
    }

    await BlogCommentLike.deleteMany({ blogComment: blogComment._id });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = removeBlogComment;
