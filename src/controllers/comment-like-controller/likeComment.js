const CommentLike = require('../../models/comment-like.model');

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
      });

      await commentLike.save();
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = likeComment;
