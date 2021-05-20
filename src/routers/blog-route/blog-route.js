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

const userAuth = require('../../middleware/user-auth');
const auth = require('../../middleware/auth');

const createBlog = require('../../controllers/blog-controller/createBlog');
const updateBlog = require('../../controllers/blog-controller/updateBlog');
const getBlog = require('../../controllers/blog-controller/getBlog');
const getBlogs = require('../../controllers/blog-controller/getBlogs');
const getMyBlogs = require('../../controllers/blog-controller/getMyBlogs');
const getUserBlogs = require('../../controllers/blog-controller/getUserBlogs');
const searchBlogs = require('../../controllers/blog-controller/searchBlogs');
const searchBlogsByTag = require('../../controllers/blog-controller/searchBlogsByTag');
const deleteBlog = require('../../controllers/blog-controller/deleteBlog');

const router = new express.Router();

router.post(
  '/create-blog',
  userAuth,
  multer({ storage: storage }).array('blogImage'),
  async (req, res) => {
    await createBlog(req, res);
  }
);

router.post(
  '/update-blog',
  userAuth,
  multer({ storage: storage }).array('blogImage'),
  async (req, res) => {
    await updateBlog(req, res);
  }
);

router.get('/get-blog/:id', auth, async (req, res) => {
  await getBlog(req, res);
});

router.get('/get-blogs/:limit/:skip', auth, async (req, res) => {
  await getBlogs(req, res);
});

router.get('/get-my-blogs/:limit/:skip', userAuth, async (req, res) => {
  await getMyBlogs(req, res);
});

router.get('/get-user-blogs/:limit/:skip', userAuth, async (req, res) => {
  await getUserBlogs(req, res);
});

router.get('/search-blogs/:limit/:skip', userAuth, async (req, res) => {
  await searchBlogs(req, res);
});

router.get('/search-blogs-by-tag/:tag/:limit/:skip', userAuth, async (req, res) => {
  await searchBlogsByTag(req, res);
});

router.post('/delete-blog', userAuth, async (req, res) => {
  await deleteBlog(req, res);
});

module.exports = router;
