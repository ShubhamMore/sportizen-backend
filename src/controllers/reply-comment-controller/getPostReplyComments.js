const ReplyComment = require('../../models/post-model/reply-comment.model');

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
                userImageURL: 1,
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
        $addFields: {
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
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadyLiked: { $cond: [{ $eq: ['$replyCommentLike', true] }, true, false] },
              },
            },
          ],
          as: 'likeStatus',
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
            { $count: 'postReplyCommentLikes' },
          ],
          as: 'replyCommentLikes',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$likeStatus', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$replyCommentLikes', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          likeStatus: 0,
          replyCommentLikes: 0,
          sportizenUser: 0,
          id: 0,
          post: 0,
          comment: 0,
        },
      },
    ]);

    responseHandler(comments, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostReplyComments;
