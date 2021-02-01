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

const createBlog = require('../../controllers/blog-controller/create-blog');
const getMyBlog = require('../../controllers/blog-controller/get-my-blogs');
const viewBlog = require('../../controllers/blog-controller/view-blog');
const deleteBlog = require('../../controllers/blog-controller/delete-blog');
const likeBlog = require('../../controllers/blog-controller/like-blog');

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
  await getMyBlog(req, res);
});

router.post('/view-blog', auth, async (req, res) => {
  await viewBlog(req, res);
});

router.post('/update-blog', auth, async (req, res) => {
  // await viewBlog(req, res);
});

router.post('/like-blog', auth, async (req, res) => {
  await likeBlog(req, res);
});

router.post('/unlike-blog', auth, async (req, res) => {
  // await viewBlog(req, res);
});

router.post('/comment-blog', auth, async (req, res) => {
  // await viewBlog(req, res);
});

router.post('/delete-blog', auth, async (req, res) => {
  await deleteBlog(req, res);
});

router.post('/search-blogs', async (req, res) => {
  // await deleteBlog(req, res);
});

module.exports = router;
