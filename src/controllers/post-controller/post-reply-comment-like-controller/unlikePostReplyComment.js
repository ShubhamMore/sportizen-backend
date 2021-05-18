const PostReplyCommentLike = require('../../../models/post-model/post-reply-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const unlikePostReplyComment = async (req, res) => {
  try {
    const postReplyCommentLike = await PostReplyCommentLike.findOneAndDelete({
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

module.exports = unlikePostReplyComment;
