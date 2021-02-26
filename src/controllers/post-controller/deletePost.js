const Post = require('../../models/post-model/post.model');
const PostLike = require('../../models/post-model/post-like.model');
const PostView = require('../../models/post-model/post-view.model');
const SavePost = require('../../models/post-model/save-post.model');
const Comment = require('../../models/post-model/comment.model');
const CommentLike = require('../../models/post-model/comment-like.model');
const ReplyComment = require('../../models/post-model/reply-comment.model');
const ReplyCommentLike = require('../../models/post-model/reply-comment-like.model');

const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);

    if (!post) {
      throw new Error('Post Not Found');
    }

    if (post.sportizenUser !== req.user.sportizenId) {
      throw new Error('You are not authorized user to delete this Post');
    }

    if (post.publicId) {
      await awsRemoveFile(post.publicId);
    }

    const deletePost = Post.findByIdAndDelete(req.body.id);
    const postLike = PostLike.deleteMany({ post: req.body.id });
    const postView = PostView.deleteMany({ post: req.body.id });
    const savePost = SavePost.deleteMany({ post: req.body.id });
    const comment = Comment.deleteMany({ post: req.body.id });
    const commentLike = CommentLike.deleteMany({ post: req.body.id });
    const replyComment = ReplyComment.deleteMany({ post: req.body.id });
    const replyCommentLike = ReplyCommentLike.deleteMany({ post: req.body.id });

    try {
      Promise.all([
        deletePost,
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
