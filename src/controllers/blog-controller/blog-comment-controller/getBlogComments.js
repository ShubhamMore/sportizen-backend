const BlogComment = require('../../../models/blog-model/blog-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const getBlogComments = async (req, res) => {
  try {
    const sportizenId = req.user ? req.user.sportizenId : '';

    const query = [
      {
        $match: {
          blog: req.body.blog,
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

    const blogComments = await BlogComment.aggregate([
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
          from: 'blogCommentlikes',
          let: { commentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$blog', req.body.blog] },
                    { $eq: ['$comment', '$$commentId'] },
                    { $eq: ['$sportizenUser', sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadyLiked: { $cond: [{ $eq: ['$commentLike', true] }, true, false] },
              },
            },
          ],
          as: 'likeStatus',
        },
      },
      {
        $lookup: {
          from: 'blogCommentlikes',
          let: { commentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$blog', req.body.blog] }, { $eq: ['$comment', '$$commentId'] }],
                },
              },
            },
            { $count: 'blogCommentLikes' },
          ],
          as: 'commentLikes',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$likeStatus', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$commentLikes', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          likeStatus: 0,
          commentLikes: 0,
          sportizenUser: 0,
          id: 0,
          blog: 0,
        },
      },
    ]);

    responseHandler(blogComments, 200, req, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, req, res);
  }
};

module.exports = getBlogComments;
