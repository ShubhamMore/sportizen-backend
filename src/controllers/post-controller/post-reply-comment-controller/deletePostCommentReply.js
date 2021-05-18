const PostReplyComment = require('../../../models/post-model/post-reply-comment.model');
const PostReplyCommentLike = require('../../../models/post-model/post-reply-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const deletePostReplyComment = async (req, res) => {
  try {
    const postReplyComment = await PostReplyComment.findByIdAndDelete(req.body.id);

    if (!postReplyComment) {
      throw new Error('Reply Comment not Found');
    }

    await PostReplyCommentLike.deleteMany({ replyComment: req.body.id });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deletePostReplyComment;
