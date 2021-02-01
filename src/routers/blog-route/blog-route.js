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
    cb(null, 'event-' + name.substring(0, name.lastIndexOf('.')) + '-' + Date.now() + '.' + ext);
  },
});

const auth = require('../../middleware/auth');

<<<<<<< HEAD:src/routers/blog-route/blog-route.js
const createBlog = require('../../controllers/blog-controller/create-blog');
const getMyblog = require('../../controllers/blog-controller/get-my-blogs');
const viewBlog = require('../../controllers/blog-controller/view-blog');
=======
const createBlog = require('../controllers/blog-controller/create-blog');
const getMyblog = require('../controllers/blog-controller/get-my-blogs');
const viewBlog = require('../controllers/blog-controller/view-blog');
const deleteBlog = require('../controllers/blog-controller/delete-blog');
const likeBlog = require('../controllers/blog-controller/like-blog');
>>>>>>> 80dd7b769ed244447ad858ae8457b4bce5d98e2d:src/routers/blog-route.js
const router = new express.Router();

router.post(
  '/create-blog',
  auth,
  multer({ storage: storage }).array('blogImage'),
  async (req, res) => {
    await createBlog(req, res);
  }
);

router.post('/get-my-blog', auth, async (req, res) => {
  await getMyblog(req, res);
});

router.post('/view-blog', auth, async (req, res) => {
  await viewBlog(req, res);
});

router.post('/update-blog');

router.post('/like-blog', auth, async (req, res) => {
  await likeBlog(req, res);
});

router.post('/unlike-blog');

router.post('/comment-blog');

router.post('/delete-blog', auth, async (req, res) => {
  await deleteBlog(req, res);
});

router.post('/search-blogs', async (req, res) => {});

module.exports = router;
