const UserProfile = require('../../models/user-profile.model');
const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');
const noUser = require('../../shared/user.image');
const saveUserProfile = async (req, res) => {
  try {
    const file = req.file;

    const userProfile = await UserProfile.findById(req.body._id);

    let profile_image = userProfile.userImage;

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudeDirectory = 'profile_image';
      const upload_responce = await awsUploadFile(filePath, fileName, cloudeDirectory);

      const upload_res = upload_responce.upload_res;

      if (upload_res) {
        if (profile_image.public_id !== noUser.public_id) {
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

    await UserProfile.findByIdAndUpdate(userProfile._id, {
      profileCompleted: '1',
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      sportsInterest: req.body.sportsInterest.split(','),
      userImage: profile_image,
    });

    const updatedUserProfile = await UserProfile.findById(userProfile._id);

    res.send(updatedUserProfile);
  } catch (e) {
    console.log(e);
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = saveUserProfile;
