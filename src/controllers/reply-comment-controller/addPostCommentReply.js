const ReplyComment = require('../../models/reply-comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addPostCommentReply = async (req, res) => {
  try {
    replyComment = new ReplyComment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      replyComment: req.body.replyComment,
      createdAt: new Date().toISOString(),
    });

    await replyComment.save();

    responseHandler(replyComment, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addPostCommentReply;
