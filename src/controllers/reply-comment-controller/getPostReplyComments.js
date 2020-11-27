const ReplyComment = require('../../models/reply-comment.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getPostReplyComments = async (req, res) => {
  try {
    const comments = await ReplyComment.aggregate([
      {
        $match: {
          post: req.body.post,
          comment: req.body.comment,
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
        $addField: {
          id: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'replycommentlikes',
          let: { replyCommentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$post', req.body.post] },
                    { $eq: ['$comment', req.body.comment] },
                    { $eq: ['$replyComment', '$$replyCommentId'] },
                  ],
                },
              },
            },
            { $count: 'replyCommentLikes' },
          ],
          as: 'replyCommentLikes',
        },
      },
    ]);

    responseHandler(comments, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostReplyComments;
