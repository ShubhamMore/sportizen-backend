const Comment = require('../../models/comment.model');
const CommentLike = require('../../models/comment-like.model');
const ReplyComment = require('../../models/reply-comment.model');
const ReplyCommentLike = require('../../models/reply-comment-like.model');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.body.id);

    if (!comment) {
      throw new Error('Comment not Found');
    }

    const commentLike = CommentLike.deleteMany({ comment: comment._id });
    const replyComment = ReplyComment.deleteMany({ comment: comment._id });
    const replyCommentLike = ReplyCommentLike.deleteMany({ comment: comment._id });

    try {
      Promise.all([commentLike, replyComment, replyCommentLike])
        .then((resData) => {
          responseHandler({ success: true }, 200, res);
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e) {
      errorHandler(e, 400, res);
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteComment;
