const Comment = require('../../models/comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          post: req.body.post,
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
      { $project: { users: 0 } },
      {
        $addFields: {
          id: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'commentlikes',
          let: { commentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$post', req.body.post] }, { $eq: ['$comment', '$$commentId'] }],
                },
              },
            },
            { $count: 'postCommentLikes' },
          ],
          as: 'commentLikes',
        },
      },
      {
        $lookup: {
          from: 'replycomments',
          let: { commentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$post', req.body.post] }, { $eq: ['$comment', '$$commentId'] }],
                },
              },
            },
            { $count: 'postReplyComments' },
          ],
          as: 'replyComments',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$commentLikes', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$replyComments', 0] }, '$$ROOT'] },
        },
      },
      { $project: { commentLikes: 0, sportizenUser: 0, replyComments: 0, id: 0, post: 0 } },
    ]);

    responseHandler(comments, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostComments;
