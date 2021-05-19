const Blog = require('../../models/blog-model/blog.model');

const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const mongoose = require('mongoose');

const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const sportizenId = req.user ? req.user.sportizenId : '';

    if (mongoose.Types.ObjectId.isValid(blogId)) {
      const blog = await Blog.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(blogId),
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
            from: 'bloglikes',
            let: { blogId: '$id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$blog', '$$blogId'] },
                      { $eq: ['$sportizenUser', sportizenId] },
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
                      { $eq: ['$sportizenUser', sportizenId] },
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
            likeStatus: 0,
            likes: 0,
            comments: 0,
            bookmarkBlogs: 0,
            blogUser: 0,
            __v: 0,
          },
        },
      ]);

      if (!blog[0]) {
        throw new Error('Blog Not Found');
      }

      await Blog.findByIdAndUpdate(
        {
          _id: blogId,
        },
        {
          $inc: { blogViews: 1 },
        }
      );

      responseHandler(blog[0], 200, req, res);
    } else {
      throw new Error('invalid Blog Id');
    }
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getBlog;

// const Blog = require('../../models/blog-model/blog.model');
// const mongoose = require('mongoose');
// const errorHandler = require('../../handlers/error.handler');
// const responseHandler = require('../../handlers/response.handler');

// const getBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const sportizenId = req.user ? req.user.sportizenId : '';

//     if (mongoose.Types.ObjectId.isValid(blogId)) {
//       const blog = await Blog.aggregate([
//         {
//           $match: {
//             _id: mongoose.Types.ObjectId(blogId),
//           },
//         },
//         {
//           $lookup: {
//             from: 'userprofiles',
//             localField: 'createdBy',
//             foreignField: 'sportizenId',
//             as: 'sportizenUsers',
//           },
//         },
//         {
//           $addFields: {
//             sportizenUser: { $arrayElemAt: ['$sportizenUsers', 0] },
//           },
//         },
//         {
//           $addFields: {
//             createdUserImage: '$sportizenUser.userImageURL',
//             createdUser: '$sportizenUser.name',
//           },
//         },

//         {
//           $project: {
//             sportizenUser: 0,
//             sportizenUsers: 0,
//           },
//         },
//       ]);

//       if (!blog[0]) {
//         throw new Error('No Blog Found..');
//       }

//       responseHandler(blog[0], 200, req, res);
//     } else {
//       throw new Error('invalid Event Id');
//     }
//   } catch (e) {
//     errorHandler(e, 400, req, res);
//   }
// };

// module.exports = getBlog;
