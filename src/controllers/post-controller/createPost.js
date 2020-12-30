const Post = require('../../models/post.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const postSchema = require('../../schema/postSchema');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');
const Ajv = require('ajv');
const ajv = new Ajv();

const createPost = async (req, res) => {
  try {
    const file = req.file;
    const valid = ajv.validate(postSchema.createPostfile, { file: req.file, ...req.body });
    if (!valid) {
      throw new Error(ajv.errors[0].message);
    }
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
      postType: req.body.postType,
      description: req.body.description,
      filename: postFile.fileName,
      secureUrl: postFile.secureUrl,
      publicId: postFile.publicId,
      visibility: req.body.visibility,
    };

    const post = new Post(newPost);

    await post.save();

    responseHandler(post, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = createPost;
