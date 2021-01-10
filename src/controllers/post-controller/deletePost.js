const Post = require('../../models/post.model');
const PostLike = require('../../models/post-like.model');
const PostView = require('../../models/post-view.model');
const SavePost = require('../../models/save-post.model');
const Comment = require('../../models/comment.model');
const CommentLike = require('../../models/comment-like.model');
const ReplyComment = require('../../models/reply-comment.model');
const ReplyCommentLike = require('../../models/reply-comment-like.model');

const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.body.id);

    if (post.publicId) {
      await awsRemoveFile(post.publicId);
    }

    const postLike = PostLike.deleteMany({ post: req.body.id });
    const postView = PostView.deleteMany({ post: req.body.id });
    const savePost = SavePost.deleteMany({ post: req.body.id });
    const comment = Comment.deleteMany({ post: req.body.id });
    const commentLike = CommentLike.deleteMany({ post: req.body.id });
    const replyComment = ReplyComment.deleteMany({ post: req.body.id });
    const replyCommentLike = ReplyCommentLike.deleteMany({ post: req.body.id });

    try {
      Promise.all([
        postLike,
        postView,
        savePost,
        comment,
        commentLike,
        replyComment,
        replyCommentLike,
      ])
        .then((resData) => {
          responseHandler({ success: true }, 200, res);
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e) {
      errorHandler(e, 400, res);
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deletePost;
