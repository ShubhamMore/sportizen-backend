const SavePost = require('../../models/save-post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getSavedPosts = async (req, res) => {
  try {
    const savesPosts = await SavePost.aggregate([
      {
        $match: {
          post: req.body.post,
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
              $addField: {
                id: {
                  $toString: '$_id',
                },
              },
            },
            {
              $lookup: {
                from: 'likes',
                let: { postId: '$id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                  { $count: 'likes' },
                ],
                as: 'likes',
              },
            },
            {
              $lookup: {
                from: 'comments',
                let: { post_id: '$postId' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                  { $count: 'comments' },
                ],
                as: 'comments',
              },
            },
            {
              $lookup: {
                from: 'replycomments',
                let: { post_id: '$postId' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                  { $count: 'replyComments' },
                ],
                as: 'replyComments',
              },
            },
          ],
          as: 'posts',
        },
      },
      {
        $project: {
          posts: 1,
        },
      },
      { $unwind: 'posts' },
    ]);

    responseHandler(savesPosts, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getSavedPosts;
