const SavePost = require('../../models/save-post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getSavedPosts = async (req, res) => {
  try {
    const savesPosts = await SavePost.aggregate([
      {
        $match: {
          sportizenUser: req.user.sportizenId,
        },
      },
      {
        $addFields: {
          id: { $toObjectId: '$post' },
        },
      },
      {
        $lookup: {
          from: 'posts',
          let: { postId: '$id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$postId'] } } },
            {
              $addFields: {
                id: {
                  $toString: '$_id',
                },
              },
            },
            {
              $lookup: {
                from: 'postlikes',
                let: { postId: '$id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                  { $count: 'postLikes' },
                ],
                as: 'likes',
              },
            },
            {
              $lookup: {
                from: 'comments',
                let: { postId: '$id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                  { $count: 'postComments' },
                ],
                as: 'comments',
              },
            },
            {
              $lookup: {
                from: 'replycomments',
                let: { postId: '$id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                  { $count: 'postReplyComments' },
                ],
                as: 'replyComments',
              },
            },

            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$likes', 0] }, '$$ROOT'] },
              },
            },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$comments', 0] }, '$$ROOT'] },
              },
            },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$replyComments', 0] }, '$$ROOT'] },
              },
            },

            { $project: { likes: 0, comments: 0, replyComments: 0 } },
          ],
          as: 'posts',
        },
      },
      {
        $project: {
          _id: 0,
          posts: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$posts', 0] }, '$$ROOT'] },
        },
      },
      { $project: { posts: 0 } },
    ]);

    responseHandler(savesPosts, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getSavedPosts;
