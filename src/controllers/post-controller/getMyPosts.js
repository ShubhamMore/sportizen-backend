const Post = require('../../models/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          sportizenUser: req.user.sportizenId,
        },
      },
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
    ]);

    responseHandler(posts, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyPosts;
