const Comment = require('../../models/comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addPostComment = async (req, res) => {
  try {
    comment = new Comment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
    });

    await comment.save();

    responseHandler(comment, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addPostComment;
