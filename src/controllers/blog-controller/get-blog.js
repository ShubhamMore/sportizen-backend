const Blog = require('../../models/blog-model/blog.model');
const mongoose = require('mongoose');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

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
          $lookup: {
            from: 'userprofiles',
            localField: 'createdBy',
            foreignField: 'sportizenId',
            as: 'sportizenUsers',
          },
        },
        {
          $addFields: {
            sportizenUser: { $arrayElemAt: ['$sportizenUsers', 0] },
          },
        },
        {
          $addFields: {
            createdUserImage: '$sportizenUser.userImageURL',
            createdUser: '$sportizenUser.name',
          },
        },

        {
          $project: {
            sportizenUser: 0,
            sportizenUsers: 0,
          },
        },
      ]);

      if (!blog[0]) {
        throw new Error('No Blog Found..');
      }

      responseHandler(blog[0], 200, req, res);
    } else {
      throw new Error('invalid Event Id');
    }
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getBlog;
