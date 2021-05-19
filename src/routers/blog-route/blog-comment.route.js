const express = require('express');
const userAuth = require('../../middleware/user-auth');
const auth = require('../../middleware/auth');

const addBlogComment = require('../../controllers/blog-controller/blog-comment-controller/addBlogComment');
const deleteBlogComment = require('../../controllers/blog-controller/blog-comment-controller/removeBlogComment');
const getBlogComments = require('../../controllers/blog-controller/blog-comment-controller/getBlogComments');

const router = new express.Router();

router.post('/addBlogComment', userAuth, async (req, res) => {
  await addBlogComment(req, res);
});

router.post('/deleteBlogComment', userAuth, async (req, res) => {
  await deleteBlogComment(req, res);
});

router.post('/getBlogComments', auth, async (req, res) => {
  await getBlogComments(req, res);
});

module.exports = router;
