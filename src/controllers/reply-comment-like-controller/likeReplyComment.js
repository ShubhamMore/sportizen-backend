const ReplyCommentLike = require('../../models/post-model/reply-comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const likeReplyComment = async (req, res) => {
  try {
    let replyCommentLike = await ReplyCommentLike.findOne({
      post: req.body.post,
      comment: req.body.comment,
      replyComment: req.body.replyComment,
      sportizenUser: req.user.sportizenId,
    });

    if (!replyCommentLike) {
      replyCommentLike = new ReplyCommentLike({
        post: req.body.post,
        comment: req.body.comment,
        replyComment: req.body.replyComment,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await replyCommentLike.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = likeReplyComment;
