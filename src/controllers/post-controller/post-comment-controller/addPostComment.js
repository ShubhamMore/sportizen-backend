const PostComment = require('../../../models/post-model/post-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const mongoose = require('mongoose');

const addPostComment = async (req, res) => {
  try {
    const postComment = new PostComment({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
    });

    await postComment.save();

    const postComments = await PostComment.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postComment._id),
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

    responseHandler(postComments.length > 0 ? postComments[0] : postComment, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addPostComment;
