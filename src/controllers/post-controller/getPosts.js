const UserConnection = require('../../models/user-connection-model/user-connection.model');
const Post = require('../../models/post-model/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const mongoose = require('mongoose');

const getPosts = async (req, res) => {
  try {
    const connections = await UserConnection.aggregate([
      {
        $match: {
          primaryUser: req.user.sportizenId,
          status: 'following',
        },
      },
      { $project: { _id: 0, followedUser: 1 } },
    ]);

    const userConnections = new Array();

    userConnections.push(req.user.sportizenId);

    for (const connection of connections) {
      userConnections.push(connection.followedUser);
    }

    const query = [
      {
        $match: {
          // _id: mongoose.Types.ObjectId('5fd8f2997cafe35d194ba8c5'),
          sportizenUser: { $in: userConnections },
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

    const posts = await Post.aggregate([
      ...query,
      {
        $addFields: {
          id: {
            $toString: '$_id',
          },
          sharedPost: {
            $toObjectId: '$sharedPost',
          },
        },
      },
      {
        $lookup: {
          from: 'posts',
          let: { postId: '$sharedPost' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$postId'] }],
                },
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
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$postUser', 0] }, '$$ROOT'] },
              },
            },
            {
              $project: {
                postUser: 0,
                __v: 0,
              },
            },
          ],
          as: 'posts',
        },
      },
      {
        $addFields: {
          sharedPost: { $arrayElemAt: ['$posts', 0] },
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
          from: 'postviews',
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
                alreadyViewed: { $cond: [{ $eq: ['$postView', true] }, true, false] },
              },
            },
          ],
          as: 'viewStatus',
        },
      },
      {
        $lookup: {
          from: 'postviews',
          let: { postId: '$id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
            { $count: 'postViews' },
          ],
          as: 'views',
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
              $project: {
                _id: 0,
                alreadySaved: { $cond: [{ $eq: ['$savePost', true] }, true, false] },
              },
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
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$viewStatus', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$views', 0] }, '$$ROOT'] },
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
          posts: 0,
          likeStatus: 0,
          likes: 0,
          viewStatus: 0,
          views: 0,
          comments: 0,
          replyComments: 0,
          savePosts: 0,
          postUser: 0,
          __v: 0,
        },
      },
    ]);

    responseHandler(posts, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPosts;
