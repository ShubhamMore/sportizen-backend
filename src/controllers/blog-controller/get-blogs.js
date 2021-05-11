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
        $sort: { _id: -1 },
      },
    ];

    // if (req.body.longitude && req.body.latitude) {
    //   query.location = {
    //     $geoWithin: { $centerSphere: [[req.body.latitude, req.body.longitude], 100 / 3963.2] },
    //     // 10 Miles of Radius, The query converts the distance to radians by dividing by the approximate equatorial radius of the earth, 3963.2 miles
    //   };
    // }

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
