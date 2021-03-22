const Blog = require('../../models/blog-model/blog.model');
const mongoose = require('mongoose');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.id),
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

    responseHandler(blog[0], 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getBlog;
