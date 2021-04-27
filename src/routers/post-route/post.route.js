const express = require('express');
const multer = require('multer');

const MIME_TYPE_MAP = {
  // IMAGES
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',

  // VIDEOS
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
const userAuth = require('../../middleware/user-auth');

const createPost = require('../../controllers/post-controller/createPost');
const updatePost = require('../../controllers/post-controller/updatePost');
const sharePost = require('../../controllers/post-controller/share-post');
const deletePost = require('../../controllers/post-controller/deletePost');
const getMyPosts = require('../../controllers/post-controller/getMyPosts');
const getPost = require('../../controllers/post-controller/getPost');
const getPosts = require('../../controllers/post-controller/getPosts');
const getUserPosts = require('../../controllers/post-controller/getUserPosts');

const router = new express.Router();

router.post(
  '/createPost',
  userAuth,
  multer({ storage: storage }).single('post'),
  async (req, res) => {
    await createPost(req, res);
  }
);

router.post(
  '/updatePost',
  userAuth,
  multer({ storage: storage }).single('post'),
  async (req, res) => {
    await updatePost(req, res);
  }
);

router.post('/sharePost', userAuth, async (req, res) => {
  await sharePost(req, res);
});

router.post('/deletePost', userAuth, async (req, res) => {
  await deletePost(req, res);
});

router.post('/getMyPosts', userAuth, async (req, res) => {
  await getMyPosts(req, res);
});

router.get('/getPost/:id', auth, async (req, res) => {
  await getPost(req, res);
});

router.post('/getPosts', userAuth, async (req, res) => {
  await getPosts(req, res);
});

router.post('/getUserPosts', userAuth, async (req, res) => {
  await getUserPosts(req, res);
});

module.exports = router;
