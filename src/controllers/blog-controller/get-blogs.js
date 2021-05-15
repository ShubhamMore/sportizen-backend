const Blog = require('../../models/blog-model/blog.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllBlogs = async (req, res) => {
  try {
    const sportizenId = req.user ? req.user.sportizenId : '';

    const query = [
      {
        $match: {},
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

    responseHandler(blogs, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getAllBlogs;
