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

    console.log(req.params);

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
    console.log(e);
    errorHandler(e, 400, req, res);
  }
};

module.exports = getMyBlogs;
