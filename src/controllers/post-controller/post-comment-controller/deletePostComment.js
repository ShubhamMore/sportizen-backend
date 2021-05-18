const PostComment = require('../../../models/post-model/post-comment.model');
const PostCommentLike = require('../../../models/post-model/post-comment-like.model');
const PostReplyComment = require('../../../models/post-model/post-reply-comment.model');
const PostReplyCommentLike = require('../../../models/post-model/post-reply-comment-like.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const deletePostComment = async (req, res) => {
  try {
    const postComment = await PostComment.findByIdAndDelete(req.body.id);

    if (!postComment) {
      throw new Error('Comment not Found');
    }

    const postCommentLike = PostCommentLike.deleteMany({ comment: postComment._id });
    const postReplyComment = PostReplyComment.deleteMany({ comment: postComment._id });
    const postReplyCommentLike = PostReplyCommentLike.deleteMany({ comment: postComment._id });

    Promise.all([postCommentLike, postReplyComment, postReplyCommentLike])
      .then((resData) => {
        responseHandler({ success: true }, 200, req, res);
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deletePostComment;
