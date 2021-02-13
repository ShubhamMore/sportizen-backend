const express = require('express');
const multer = require('multer');

const MIME_TYPE_MAP = {
  // IMAGES
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'fileToUpload');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

const auth = require('../../middleware/auth');

const getUserProfile = require('../../controllers/user-profile-controller/getUserProfile');
const getMyProfile = require('../../controllers/user-profile-controller/getMyProfile');
const saveUserProfile = require('../../controllers/user-profile-controller/saveUserProfile');
const saveProfileImage = require('../../controllers/user-profile-controller/saveProfileImage');
const saveCoverImage = require('../../controllers/user-profile-controller/saveCoverImage');
const saveUserStory = require('../../controllers/user-profile-controller/saveUserStory');

const router = new express.Router();

router.post('/getUserProfile', auth, async (req, res) => {
  await getUserProfile(req, res);
});

router.post('/getMyProfile', auth, async (req, res) => {
  await getMyProfile(req, res);
});

router.post(
  '/saveUserProfile',
  auth,
  multer({ storage: storage }).single('profileImage'),
  async (req, res) => {
    await saveUserProfile(req, res);
  }
);

router.post(
  '/saveProfileImage',
  auth,
  multer({ storage: storage }).single('profileImage'),
  async (req, res) => {
    await saveProfileImage(req, res);
  }
);

router.post(
  '/saveCoverImage',
  auth,
  multer({ storage: storage }).single('coverImage'),
  async (req, res) => {
    await saveCoverImage(req, res);
  }
);

router.post('/saveUserStory', auth, async (req, res) => {
  await saveUserStory(req, res);
});

module.exports = router;
