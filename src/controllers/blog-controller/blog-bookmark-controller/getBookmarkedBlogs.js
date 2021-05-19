const BookmarkBlog = require('../../../models/blog-model/bookmark-blog.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const getBookmarkdBlogs = async (req, res) => {
  try {
    const bookmarksBlogs = await BookmarkBlog.aggregate([
      {
        $match: {
          sportizenUser: req.user.sportizenId,
        },
      },
      {
        $addFields: {
          id: { $toObjectId: '$blog' },
        },
      },
      {
        $lookup: {
          from: 'blogs',
          let: { blogId: '$id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$blogId'] } } },
            {
              $addFields: {
                id: {
                  $toString: '$_id',
                },
              },
            },
            {
              $lookup: {
                from: 'bloglikes',
                let: { blogId: '$id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$blog', '$$blogId'] } } },
                  { $count: 'blogLikes' },
                ],
                as: 'likes',
              },
            },
            {
              $lookup: {
                from: 'comments',
                let: { blogId: '$id' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$blog', '$$blogId'] } } },
                  { $count: 'blogComments' },
                ],
                as: 'comments',
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

            { $project: { likes: 0, comments: 0 } },
          ],
          as: 'blogs',
        },
      },
      {
        $project: {
          _id: 0,
          blogs: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$blogs', 0] }, '$$ROOT'] },
        },
      },
      { $project: { blogs: 0 } },
    ]);

    responseHandler(bookmarksBlogs, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getBookmarkdBlogs;
