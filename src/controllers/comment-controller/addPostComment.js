const Comment = require('../../models/post-model/comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addPostComment = async (req, res) => {
  try {
    comment = new Comment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
    });

    await comment.save();

    responseHandler(comment, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addPostComment;
