const express = require('express');
const auth = require('../middleware/auth');

const getReplyCommentLikes = require('../controllers/reply-comment-like-controller/getReplyCommentLikes');
const likeReplyComment = require('../controllers/reply-comment-like-controller/likeReplyComment');
const unlikeReplyComment = require('../controllers/reply-comment-like-controller/unlikeReplyComment');

const router = new express.Router();

router.post('/getReplyCommentLikes', auth, async (req, res) => {
  await getReplyCommentLikes(req, res);
});

router.post('/likeReplyComment', auth, async (req, res) => {
  await likeReplyComment(req, res);
});

router.post('/unlikeReplyComment', auth, async (req, res) => {
  await unlikeReplyComment(req, res);
});

module.exports = router;
