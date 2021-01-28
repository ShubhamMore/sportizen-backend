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
const getMyblog = require('../../controllers/blog-controller/get-my-blogs');
const viewBlog = require('../../controllers/blog-controller/view-blog');
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
router.post('/like-blog');
router.post('/unlike-blog');
router.post('/comment-blog');
router.post('/delete-blog');
router.post('/search-blogs');

module.exports = router;
