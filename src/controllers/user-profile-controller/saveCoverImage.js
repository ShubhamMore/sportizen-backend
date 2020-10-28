const UserProfile = require('../../models/user-profile.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserCoverImage = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let cover_image = userProfile.userCoverImage;

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'cover_image';
      const upload_responce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const upload_res = upload_responce.upload_res;

      if (upload_res) {
        if (cover_image.public_id !== undefined) {
          await awsRemoveFile(cover_image.public_id);
        }

        cover_image = {
          image_name: upload_res.key,
          secure_url: upload_res.Location,
          public_id: upload_res.key,
          created_at: Date.now(),
        };
      }
    }

    await UserProfile.findByIdAndUpdate(userProfile._id, {
      userCoverImageURL: cover_image.secure_url,
      userCoverImage: cover_image,
    });

    const updatedUserProfile = await UserProfile.findById(userProfile._id);

    responseHandler(updatedUserProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = saveUserCoverImage;
