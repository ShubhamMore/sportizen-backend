const PostCommentLike = require('../../../models/post-model/post-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const unlikePostComment = async (req, res) => {
  try {
    const postCommentLike = await PostCommentLike.findOneAndDelete({
      post: req.body.post,
      comment: req.body.comment,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = unlikePostComment;
