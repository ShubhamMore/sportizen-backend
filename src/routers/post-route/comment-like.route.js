const express = require('express');
const auth = require('../../middleware/auth');

const getCommentLikes = require('../../controllers/comment-like-controller/getCommentLikes');
const likeComment = require('../../controllers/comment-like-controller/likeComment');
const unlikeComment = require('../../controllers/comment-like-controller/unlikeComment');

const router = new express.Router();

router.post('/getCommentLikes', auth, async (req, res) => {
  await getCommentLikes(req, res);
});

router.post('/likeComment', auth, async (req, res) => {
  await likeComment(req, res);
});

router.post('/unlikeComment', auth, async (req, res) => {
  await unlikeComment(req, res);
});

module.exports = router;
