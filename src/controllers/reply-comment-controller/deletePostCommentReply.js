const ReplyComment = require('../../models/reply-comment.model');
const ReplyCommentLike = require('../../models/reply-comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteReplyComment = async (req, res) => {
  try {
    const replyComment = await ReplyComment.findByIdAndDelete(req.body.id);

    if (!replyComment) {
      throw new Error('Reply Comment not Found');
    }

    await ReplyCommentLike.deleteMany({ replyComment: req.body.id });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteReplyComment;
