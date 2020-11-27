const ReplyCommentLike = require('../../models/reply-comment-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getReplyCommentLikes = async (req, res) => {
  try {
    const replyCommentLikes = await ReplyCommentLike.aggregate([
      {
        $match: {
          post: req.body.post,
          comment: req.body.comment,
          replyComment: req.body.replyComment,
        },
      },
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
                profileImageUrl: 1,
              },
            },
          ],
          as: 'replyCommentLikeUsers',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$replyCommentLikeUsers', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          replyCommentLikeUsers: 0,
          post: 0,
          comment: 0,
          replyComment: 0,
        },
      },
    ]);

    responseHandler(replyCommentLikes, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getReplyCommentLikes;
