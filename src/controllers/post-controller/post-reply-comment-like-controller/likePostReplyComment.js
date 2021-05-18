const PostReplyCommentLike = require('../../../models/post-model/post-reply-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const likePostReplyComment = async (req, res) => {
  try {
    let postReplyCommentLike = await PostReplyCommentLike.findOne({
      post: req.body.post,
      comment: req.body.comment,
      replyComment: req.body.replyComment,
      sportizenUser: req.user.sportizenId,
    });

    if (!postReplyCommentLike) {
      postReplyCommentLike = new PostReplyCommentLike({
        post: req.body.post,
        comment: req.body.comment,
        replyComment: req.body.replyComment,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await postReplyCommentLike.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = likePostReplyComment;
