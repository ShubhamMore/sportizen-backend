const ReplyCommentLike = require('../../models/post-model/reply-comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getReplyCommentLikes = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          post: req.body.post,
          comment: req.body.comment,
          replyComment: req.body.replyComment,
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

    const replyCommentLikes = await ReplyCommentLike.aggregate([
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
          as: 'replyCommentLikeUsers',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$replyCommentLikeUsers', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          replyCommentLikeUsers: 0,
          post: 0,
          comment: 0,
          replyComment: 0,
          sportizenUser: 0,
        },
      },
    ]);

    responseHandler(replyCommentLikes, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getReplyCommentLikes;
