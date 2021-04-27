const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getCommentLikes = require('../../controllers/comment-like-controller/getCommentLikes');
const likeComment = require('../../controllers/comment-like-controller/likeComment');
const unlikeComment = require('../../controllers/comment-like-controller/unlikeComment');

const router = new express.Router();

router.post('/getCommentLikes', userAuth, async (req, res) => {
  await getCommentLikes(req, res);
});

router.post('/likeComment', userAuth, async (req, res) => {
  await likeComment(req, res);
});

router.post('/unlikeComment', userAuth, async (req, res) => {
  await unlikeComment(req, res);
});

module.exports = router;
