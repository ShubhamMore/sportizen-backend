const UserProfile = require('../../models/user-model/user-profile.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserProfileImage = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let profileImage = userProfile.userImage;

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'profileImage';
      const uploadResponce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;

      if (uploadRes) {
        if (profileImage.publicId !== undefined) {
          await awsRemoveFile(profileImage.publicId);
        }

        profileImage = {
          imageName: uploadRes.key,
          secureUrl: uploadRes.Location,
          publicId: uploadRes.key,
          createdAt: Date.now(),
        };
      }
    }

    await UserProfile.findByIdAndUpdate(userProfile._id, {
      userImageURL: profileImage.secureUrl,
      userImage: profileImage,
    });

    const updatedUserProfile = await UserProfile.findById(userProfile._id);

    responseHandler(updatedUserProfile, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = saveUserProfileImage;
