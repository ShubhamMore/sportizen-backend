const PostComment = require('../../../models/post-model/post-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const addPostComment = async (req, res) => {
  try {
    postComment = new PostComment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
    });

    await postComment.save();

    responseHandler(postComment, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addPostComment;
