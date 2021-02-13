const UserProfile = require('../../models/user-model/user-profile.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserCoverImage = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let coverImage = userProfile.userCoverImage;

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'cover_image';
      const uploadResponce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;

      if (uploadRes) {
        if (coverImage.publicId !== undefined) {
          await awsRemoveFile(coverImage.publicId);
        }

        coverImage = {
          imageName: uploadRes.key,
          secureUrl: uploadRes.Location,
          publicId: uploadRes.key,
          createdAt: Date.now(),
        };
      }
    }

    await UserProfile.findByIdAndUpdate(userProfile._id, {
      userCoverImageURL: coverImage.secureUrl,
      userCoverImage: coverImage,
    });

    const updatedUserProfile = await UserProfile.findById(userProfile._id);

    responseHandler(updatedUserProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = saveUserCoverImage;
