const PostReplyComment = require('../../../models/post-model/post-reply-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const getPostReplyComments = async (req, res) => {
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

    const postReplyComments = await PostReplyComment.aggregate([
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
          from: 'postreplycommentlikes',
          let: { replyCommentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$post', req.body.post] },
                    { $eq: ['$comment', req.body.comment] },
                    { $eq: ['$replyComment', '$$replyCommentId'] },
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadyLiked: { $cond: [{ $eq: ['$replyCommentLike', true] }, true, false] },
              },
            },
          ],
          as: 'likeStatus',
        },
      },
      {
        $lookup: {
          from: 'postreplycommentlikes',
          let: { replyCommentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$post', req.body.post] },
                    { $eq: ['$comment', req.body.comment] },
                    { $eq: ['$replyComment', '$$replyCommentId'] },
                  ],
                },
              },
            },
            { $count: 'PostReplyCommentLikes' },
          ],
          as: 'replyCommentLikes',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$likeStatus', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$replyCommentLikes', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          likeStatus: 0,
          replyCommentLikes: 0,
          sportizenUser: 0,
          id: 0,
          post: 0,
          comment: 0,
        },
      },
    ]);

    responseHandler(postReplyComments, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getPostReplyComments;
