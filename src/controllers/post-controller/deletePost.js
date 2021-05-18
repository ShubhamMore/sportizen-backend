const Post = require('../../models/post-model/post.model');
const PostLike = require('../../models/post-model/post-like.model');
const PostView = require('../../models/post-model/post-view.model');
const PostBookmark = require('../../models/post-model/post-bookmark.model');
const PostComment = require('../../models/post-model/post-comment.model');
const PostCommentLike = require('../../models/post-model/post-comment-like.model');
const PostReplyComment = require('../../models/post-model/post-reply-comment.model');
const PostReplyCommentLike = require('../../models/post-model/post-reply-comment-like.model');

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
    const postBookmark = PostBookmark.deleteMany({ post: req.body.id });
    const postComment = PostComment.deleteMany({ post: req.body.id });
    const postCommentLike = PostCommentLike.deleteMany({ post: req.body.id });
    const postReplyComment = PostReplyComment.deleteMany({ post: req.body.id });
    const postReplyCommentLike = PostReplyCommentLike.deleteMany({ post: req.body.id });

    Promise.all([
      deletePost,
      postLike,
      postView,
      postBookmark,
      postComment,
      postCommentLike,
      postReplyComment,
      postReplyCommentLike,
    ])
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

module.exports = deletePost;
