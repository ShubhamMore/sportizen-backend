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
                profileImageUrl: 1,
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
        $addField: {
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
            { $count: 'commentLikes' },
          ],
          as: 'commentLikes',
        },
      },
    ]);

    responseHandler(comments, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostComments;
