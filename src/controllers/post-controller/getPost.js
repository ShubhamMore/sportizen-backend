const Post = require('../../models/post-model/post.model');

const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const mongoose = require('mongoose');

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const sportizenId = req.user ? req.user.sportizenId : '';

    if (mongoose.Types.ObjectId.isValid(postId)) {
      const post = await Post.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(postId),
          },
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
                      { $eq: ['$sportizenUser', sportizenId] },
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
                      { $eq: ['$sportizenUser', sportizenId] },
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
            from: 'postcomments',
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
            from: 'postreplycomments',
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
            from: 'postbookmarks',
            let: { postId: '$id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$post', '$$postId'] },
                      { $eq: ['$sportizenUser', sportizenId] },
                    ],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  alreadyBookmarked: { $cond: [{ $eq: ['$bookmark', true] }, true, false] },
                },
              },
            ],
            as: 'bookmarks',
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
            newRoot: { $mergeObjects: [{ $arrayElemAt: ['$bookmarks', 0] }, '$$ROOT'] },
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
            viewStatus: 0,
            views: 0,
            comments: 0,
            replyComments: 0,
            bookmarks: 0,
            postUser: 0,
            __v: 0,
          },
        },
      ]);

      if (!post[0]) {
        throw new Error('Post Not Found');
      }

      responseHandler(post[0], 200, req, res);
    } else {
      throw new Error('invalid Post Id');
    }
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getPost;
