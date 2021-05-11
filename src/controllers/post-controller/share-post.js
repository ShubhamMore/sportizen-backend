const Post = require('../../models/post-model/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const mongoose = require('mongoose');

const sharePost = async (req, res) => {
  try {
    const sharedPost = {
      sportizenUser: req.user.sportizenId,
      postType: 'shared',
      sharedPost: req.body.post,
      description: req.body.description ? req.body.description : null,
      filename: null,
      secureUrl: null,
      publicId: null,
      visibility: req.body.visibility,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    const post = new Post(sharedPost);

    await post.save();

    const responsePost = await Post.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(post._id),
        },
      },
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
          posts: 0,
          postUser: 0,
          __v: 0,
        },
      },
    ]);

    responseHandler(responsePost.length > 0 ? responsePost[0] : post, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = sharePost;
