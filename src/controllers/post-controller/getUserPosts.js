const Post = require('../../models/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          sportizenUser: req.body.sportizenUser,
        },
      },

      {
        $addField: {
          postId: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'likes',
          let: { post_id: '$postId' },
          pipeline: [{ $match: { $expr: { $eq: ['$post', '$$postId'] } } }, { $count: 'likes' }],
          as: 'likes',
        },
      },
      {
        $lookup: {
          from: 'comments',
          let: { post_id: '$postId' },
          pipeline: [{ $match: { $expr: { $eq: ['$post', '$$postId'] } } }, { $count: 'comments' }],
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
      {
        $lookup: {
          from: 'saveposts',
          let: { post_id: '$postId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$post', '$$postId'] },
                    { $eq: [sportizenUser, req.user.sportizenId] },
                  ],
                },
              },
            },
          ],
          as: 'savePost',
        },
      },
    ]);

    responseHandler(posts, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserPosts;
