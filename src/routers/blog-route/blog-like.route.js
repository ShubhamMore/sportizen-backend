const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getBlogLikes = require('../../controllers/blog-controller/blog-like-controller/getBlogLikes');
const likeBlog = require('../../controllers/blog-controller/blog-like-controller/likeBlog');
const unlikeBlog = require('../../controllers/blog-controller/blog-like-controller/unlikeBlog');

const router = new express.Router();

router.post('/getBlogLikes', userAuth, async (req, res) => {
  await getBlogLikes(req, res);
});

router.post('/likeBlog', userAuth, async (req, res) => {
  await likeBlog(req, res);
});

router.post('/unlikeBlog', userAuth, async (req, res) => {
  await unlikeBlog(req, res);
});

module.exports = router;
