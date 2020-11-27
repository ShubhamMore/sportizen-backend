const Comment = require('../../models/comment.model');
const ReplyComment = require('../../models/reply-comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.body.id);

    if (!comment) {
      throw new Error('Comment not Found');
    }

    await ReplyComment.deleteMany({ comment: comment._id });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteComment;
