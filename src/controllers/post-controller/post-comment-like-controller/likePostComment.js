const PostCommentLike = require('../../../models/post-model/post-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const likePostComment = async (req, res) => {
  try {
    let postCommentLike = await PostCommentLike.findOne({
      post: req.body.post,
      comment: req.body.comment,
      sportizenUser: req.user.sportizenId,
    });

    if (!postCommentLike) {
      postCommentLike = new PostCommentLike({
        post: req.body.post,
        comment: req.body.comment,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await postCommentLike.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = likePostComment;
