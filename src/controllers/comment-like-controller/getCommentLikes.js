const CommentLike = require('../../models/post-model/comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getCommentLikes = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          post: req.body.post,
          comment: req.body.comment,
        },
      },

      {
        $sort: { _id: -1 },
      },
    ];

    if (req.body.skip) {
      query.push({
        $skip: req.body.skip,
      });
    }

    if (req.body.limit) {
      query.push({
        $limit: req.body.limit,
      });
    }

    const commentLikes = await CommentLike.aggregate([
      ...query,
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
          as: 'commentLikeUsers',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$commentLikeUsers', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          commentLikeUsers: 0,
          post: 0,
          comment: 0,
          sportizenUser: 0,
        },
      },
    ]);

    responseHandler(commentLikes, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getCommentLikes;
