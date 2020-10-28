const UserProfile = require('../../models/user-profile.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserProfile = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let profile_image = userProfile.userImage;

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'profile_image';
      const upload_responce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const upload_res = upload_responce.upload_res;

      if (upload_res) {
        if (profile_image.public_id !== undefined) {
          await awsRemoveFile(profile_image.public_id);
        }

        profile_image = {
          image_name: upload_res.key,
          secure_url: upload_res.Location,
          public_id: upload_res.key,
          created_at: Date.now(),
        };
      }
    }

    userProfile.profileCompleted = '1';
    userProfile.birthDate = req.body.birthDate;
    userProfile.story = req.body.story;
    userProfile.phoneNo = req.body.phoneNo;
    userProfile.gender = req.body.gender;
    userProfile.sportsInterest = req.body.sportsInterest.split(',');
    if (profile_image.secure_url !== undefined) {
      userProfile.userImageURL = profile_image.secure_url;
    }
    userProfile.userImage = profile_image;

    await UserProfile.findByIdAndUpdate(userProfile._id, userProfile);

    const updatedUserProfile = await UserProfile.findById(userProfile._id);

    responseHandler(updatedUserProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = saveUserProfile;
