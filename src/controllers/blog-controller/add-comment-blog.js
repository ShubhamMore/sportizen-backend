const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const addComment = async (req, res) => {
  try {
    let commentBody = {
      commentedby: req.user.sportizenId,
      comment: req.body.comment,
    };
    const blog = await Blog.updateOne(
      { _id: req.body.blogId },
      {
        $push: {
          comment: commentBody,
        },
      }
    );
    responseHandler(blog, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = addComment;
