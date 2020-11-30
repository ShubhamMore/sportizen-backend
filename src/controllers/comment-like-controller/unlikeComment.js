const CommentLike = require('../../models/comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const unlikeComment = async (req, res) => {
  try {
    const commentLike = await CommentLike.findOneAndDelete({
      post: req.body.post,
      comment: req.body.comment,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = unlikeComment;
