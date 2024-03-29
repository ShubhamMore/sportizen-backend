const PostReplyComment = require('../../../models/post-model/post-reply-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const mongoose = require('mongoose');

const addPostCommentReply = async (req, res) => {
  try {
    const postReplyComment = new PostReplyComment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      replyComment: req.body.replyComment,
      createdAt: new Date().toISOString(),
    });

    await postReplyComment.save();

    const postReplyComments = await PostReplyComment.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postReplyComment._id),
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          let: { user: '$sportizenUser' },
          pipeline: [
            { $match: { $expr: { $eq: ['$sportizenId', '$$user'] } } },
            {
              $project: {
                name: 1,
                sportizenId: 1,
                userImageURL: 1,
              },
            },
          ],
          as: 'users',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$users', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          sportizenUser: 0,
          id: 0,
          post: 0,
          users: 0,
        },
      },
    ]);

    responseHandler(
      postReplyComments.length > 0 ? postReplyComments[0] : postReplyComment,
      200,
      req,
      res
    );
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addPostCommentReply;
