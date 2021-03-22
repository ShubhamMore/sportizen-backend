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
    cb(null, 'blog-' + name.substring(0, name.lastIndexOf('.')) + '-' + Date.now() + '.' + ext);
  },
});

const auth = require('../../middleware/auth');

const createBlog = require('../../controllers/blog-controller/create-blog');
const updateBlog = require('../../controllers/blog-controller/update-blog');
const getMyBlogs = require('../../controllers/blog-controller/get-my-blogs');
const getBlogs = require('../../controllers/blog-controller/get-blogs');
const getBlog = require('../../controllers/blog-controller/get-blog');
const deleteBlog = require('../../controllers/blog-controller/delete-blog');
const deleteBlogImage = require('../../controllers/blog-controller/delete-blog-image');

const router = new express.Router();

router.post(
  '/create-blog',
  auth,
  multer({ storage: storage }).array('blogImage'),
  async (req, res) => {
    await createBlog(req, res);
  }
);

router.post(
  '/update-blog',
  auth,
  multer({ storage: storage }).array('blogImage'),
  async (req, res) => {
    await updateBlog(req, res);
  }
);

router.post('/get-blogs', auth, async (req, res) => {
  await getBlogs(req, res);
});

router.post('/get-my-blogs', auth, async (req, res) => {
  await getMyBlogs(req, res);
});

router.post('/get-blog', auth, async (req, res) => {
  await getBlog(req, res);
});

router.post('/delete-blog', auth, async (req, res) => {
  await deleteBlog(req, res);
});

router.post('/delete-blog-image', auth, async (req, res) => {
  await deleteBlogImage(req, res);
});

module.exports = router;
