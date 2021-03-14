const Post = require('../../models/post-model/post.model');

const awsUploadFile = require('../../uploads/awsUploadFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const mongoose = require('mongoose');

const createPost = async (req, res) => {
  try {
    const file = req.file;

    const postFile = {
      fileName: null,
      secureUrl: null,
      publicId: null,
    };

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'post';
      const uploadResponce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;

      postFile.fileName = uploadRes.key;
      postFile.secureUrl = uploadRes.Location;
      postFile.publicId = uploadRes.key;
    }

    const newPost = {
      sportizenUser: req.user.sportizenId,
      postType: req.body.postType.toLowerCase(),
      description: req.body.description ? req.body.description : '',
      fileName: postFile.fileName,
      secureUrl: postFile.secureUrl,
      publicId: postFile.publicId,
      visibility: req.body.visibility,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    const post = new Post(newPost);
    await post.save();

    const responsePost = await Post.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(post._id),
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
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$postUser', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          postUser: 0,
          __v: 0,
        },
      },
    ]);

    responseHandler(responsePost.length > 0 ? responsePost[0] : post, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = createPost;
