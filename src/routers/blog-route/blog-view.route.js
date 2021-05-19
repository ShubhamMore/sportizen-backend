const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getBlogViews = require('../../controllers/blog-controller/blog-view-controller/getBlogViews');
const viewBlog = require('../../controllers/blog-controller/blog-view-controller/viewBlog');

const router = new express.Router();

router.post('/getBlogViews', userAuth, async (req, res) => {
  await getBlogViews(req, res);
});

router.post('/viewBlog', userAuth, async (req, res) => {
  await viewBlog(req, res);
});

module.exports = router;
