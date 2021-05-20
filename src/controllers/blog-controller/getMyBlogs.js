const Blog = require('../../models/blog-model/blog.model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const getMyBlogs = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          createdBy: req.user.sportizenId,
        },
      },
      {
        $project: {
          description: 0,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ];

    if (req.params.skip !== 'null') {
      query.push({
        $skip: +req.params.skip,
      });
    }

    if (req.params.limit !== 'null') {
      query.push({
        $limit: +req.params.limit,
      });
    }

    const blogs = await Blog.aggregate([
      ...query,
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
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$blog', '$$blogId'] },
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadyLiked: { $cond: [{ $eq: ['$blogLike', true] }, true, false] },
              },
            },
          ],
          as: 'likeStatus',
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
          from: 'blogviews',
          let: { blogId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$blog', '$$blogId'] },
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadyViewed: { $cond: [{ $eq: ['$blogView', true] }, true, false] },
              },
            },
          ],
          as: 'viewStatus',
        },
      },
      {
        $lookup: {
          from: 'blogviews',
          let: { blogId: '$id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$blog', '$$blogId'] } } },
            { $count: 'blogViews' },
          ],
          as: 'views',
        },
      },
      {
        $lookup: {
          from: 'blogcomments',
          let: { blogId: '$id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$blog', '$$blogId'] } } },
            { $count: 'blogComments' },
          ],
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'bookmarkblogs',
          let: { blogId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$blog', '$$blogId'] },
                    { $eq: ['$sportizenUser', req.user.sportizenId] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                alreadySaved: { $cond: [{ $eq: ['$saveBlog', true] }, true, false] },
              },
            },
          ],
          as: 'bookmarkBlogs',
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
          as: 'blogUser',
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
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$bookmarkBlogs', 0] }, '$$ROOT'] },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$blogUser', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          blogs: 0,
          likeStatus: 0,
          likes: 0,
          viewStatus: 0,
          views: 0,
          comments: 0,
          bookmarkBlogs: 0,
          blogUser: 0,
          __v: 0,
        },
      },
    ]);

    responseHandler(blogs, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getMyBlogs;
