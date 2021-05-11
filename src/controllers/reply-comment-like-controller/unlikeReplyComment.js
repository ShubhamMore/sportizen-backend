const ReplyCommentLike = require('../../models/post-model/reply-comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const unlikeReplyComment = async (req, res) => {
  try {
    const replyCommentLike = await ReplyCommentLike.findOneAndDelete({
      post: req.body.post,
      comment: req.body.comment,
      replyComment: req.body.replyComment,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = unlikeReplyComment;
