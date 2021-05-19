const BlogComment = require('../../../models/blog-model/blog-comment.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const mongoose = require('mongoose');

const addBlogComment = async (req, res) => {
  try {
    const blogComment = new BlogComment({
      blog: req.body.blog,
      sportizenUser: req.user.sportizenId,
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
    });

    await blogComment.save();

    const blogComments = await BlogComment.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(blogComment._id),
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
        $project: {
          sportizenUser: 0,
          id: 0,
          blog: 0,
        },
      },
    ]);

    responseHandler(blogComments.length > 0 ? blogComments[0] : blogComment, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addBlogComment;
