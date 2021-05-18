const PostReplyComment = require('../../../models/post-model/post-reply-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const addPostCommentReply = async (req, res) => {
  try {
    postReplyComment = new PostReplyComment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      replyComment: req.body.replyComment,
      createdAt: new Date().toISOString(),
    });

    await postReplyComment.save();

    responseHandler(postReplyComment, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addPostCommentReply;
