const CommentLike = require('../../models/post-model/comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const likeComment = async (req, res) => {
  try {
    let commentLike = await CommentLike.findOne({
      post: req.body.post,
      comment: req.body.comment,
      sportizenUser: req.user.sportizenId,
    });

    if (!commentLike) {
      commentLike = new CommentLike({
        post: req.body.post,
        comment: req.body.comment,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await commentLike.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = likeComment;
