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

const auth = require('../middleware/auth');

const createPost = require('../controllers/post-controller/createPost');
const updatePost = require('../controllers/post-controller/updatePost');
const deletePost = require('../controllers/post-controller/deletePost');
const getMyPosts = require('../controllers/post-controller/getMyPosts');
const getPost = require('../controllers/post-controller/getPost');
const getPosts = require('../controllers/post-controller/getPosts');
const getUserPosts = require('../controllers/post-controller/getUserPosts');

const router = new express.Router();

router.post('/createPost', auth, multer({ storage: storage }).single('post'), async (req, res) => {
  await createPost(req, res);
});

router.post('/updatePost', auth, multer({ storage: storage }).single('post'), async (req, res) => {
  await updatePost(req, res);
});

router.post('/deletePost', auth, async (req, res) => {
  await deletePost(req, res);
});

router.post('/getMyPosts', auth, async (req, res) => {
  await getMyPosts(req, res);
});

router.post('/getPost', auth, async (req, res) => {
  await getPost(req, res);
});

router.post('/getPosts', auth, async (req, res) => {
  await getPosts(req, res);
});

router.post('/getUserPosts', auth, async (req, res) => {
  await getUserPosts(req, res);
});

module.exports = router;
