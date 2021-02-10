const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');
const mongoose = require('mongoose');
//const awsUploadFiles = require('../../uploads/awsUploadFiles');
const viewBlog = async (req, res) => {
  try {
    const blog = await Blog.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.blogId),
        },
      },
      {
        $set: {
          totalLikes: { $size: '$likes' },
          totalBookmarks: { $size: '$bookmarkUser' },
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
        $project: {
          _id: 1,
          tags: 1,
          views: 1,
          blogTitle: 1,
          blogDescription: 1,
          totalLikes: 1,
          totalBookmarks: 1,
          images: 1,
          postUser: 1,
        },
      },
    ]);
    responseHandler(blog, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = viewBlog;
