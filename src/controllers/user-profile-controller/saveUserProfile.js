const UserProfile = require('../../models/user-profile.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const saveUserProfile = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let profileImage = userProfile.userImage;

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'profileImage';
      const uploadResponce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const uploadRes = uploadResponce.uploadRes;

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

    userProfile.profileCompleted = '1';
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

    const updatedUserProfile = await UserProfile.findById(userProfile._id);

    responseHandler(updatedUserProfile, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = saveUserProfile;
