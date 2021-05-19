const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getBlogCommentLikes = require('../../controllers/blog-controller/blog-comment-like-controller/getBlogCommentLikes');
const likeBlogComment = require('../../controllers/blog-controller/blog-comment-like-controller/likeBlogComment');
const unlikeBlogComment = require('../../controllers/blog-controller/blog-comment-like-controller/unlikeBlogComment');

const router = new express.Router();

router.post('/getBlogCommentLikes', userAuth, async (req, res) => {
  await getBlogCommentLikes(req, res);
});

router.post('/likeBlogComment', userAuth, async (req, res) => {
  await likeBlogComment(req, res);
});

router.post('/unlikeBlogComment', userAuth, async (req, res) => {
  await unlikeBlogComment(req, res);
});

module.exports = router;
