const UserProfile = require('../../models/user-model/user-profile.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserProfile = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let profileImage = userProfile.userImage;

    if (file) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'profileImage';
      const uploadResponce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;

      if (uploadRes) {
        if (profileImage.publicId) {
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

    userProfile.profileCompleted = '1';
    userProfile.name = req.body.name;
    userProfile.birthDate = req.body.birthDate;
    userProfile.story = req.body.story;
    userProfile.phoneNo = req.body.phoneNo;
    userProfile.gender = req.body.gender;
    userProfile.sportsInterest = req.body.sportsInterest.split(',');

    if (profileImage.secureUrl !== undefined) {
      userProfile.userImageURL = profileImage.secureUrl;
    }

    userProfile.userImage = profileImage;

    await UserProfile.findByIdAndUpdate(userProfile._id, userProfile);

    responseHandler(userProfile, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = saveUserProfile;
