const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getPostCommentLikes = require('../../controllers/post-controller/post-comment-like-controller/getPostCommentLikes');
const likePostComment = require('../../controllers/post-controller/post-comment-like-controller/likePostComment');
const unlikePostComment = require('../../controllers/post-controller/post-comment-like-controller/unlikePostComment');

const router = new express.Router();

router.post('/getPostCommentLikes', userAuth, async (req, res) => {
  await getPostCommentLikes(req, res);
});

router.post('/likePostComment', userAuth, async (req, res) => {
  await likePostComment(req, res);
});

router.post('/unlikePostComment', userAuth, async (req, res) => {
  await unlikePostComment(req, res);
});

module.exports = router;
