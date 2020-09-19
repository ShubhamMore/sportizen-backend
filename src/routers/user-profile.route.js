const express = require('express');
const multer = require('multer');

const auth = require('../middleware/auth');
const getUserProfile = require('../handlers/user-profile/getUserProfile');
const saveUserProfile = require('../handlers/user-profile/saveUserProfile');
const saveProfileImage = require('../handlers/user-profile/saveProfileImage');
const saveCoverImage = require('../handlers/user-profile/saveCoverImage');
const saveUserStory = require('../handlers/user-profile/saveUserStory');

const router = new express.Router();

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

router.post('/getUserProfile', auth, async (req, res) => {
  await getUserProfile(req, res);
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
