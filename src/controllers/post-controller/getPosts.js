const Post = require('../../models/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {},
      },
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
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$post', '$$postId'] },
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadyLiked: { $cond: [{ $eq: ['$postLike', true] }, true, false] },
              },
            },
          ],
          as: 'likeStatus',
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
        $lookup: {
          from: 'saveposts',
          let: { postId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$post', '$$postId'] },
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: { _id: 0, post: 0, sportizenUser: 0 },
            },
          ],
          as: 'savePosts',
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          let: { sportizenUserId: '$sportizenUser' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$sportizenId', '$$sportizenUserId'] }],
                },
              },
            },
            {
              $project: { _id: 0, userName: '$name', userImageURL: 1 },
            },
          ],
          as: 'postUser',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$likeStatus', 0] }, '$$ROOT'] },
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
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$savePosts', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$postUser', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          likeStatus: 0,
          likes: 0,
          comments: 0,
          replyComments: 0,
          savePosts: 0,
          postUser: 0,
        },
      },
    ]);

    responseHandler(posts, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPosts;
