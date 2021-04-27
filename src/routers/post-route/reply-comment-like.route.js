const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getReplyCommentLikes = require('../../controllers/reply-comment-like-controller/getReplyCommentLikes');
const likeReplyComment = require('../../controllers/reply-comment-like-controller/likeReplyComment');
const unlikeReplyComment = require('../../controllers/reply-comment-like-controller/unlikeReplyComment');

const router = new express.Router();

router.post('/getReplyCommentLikes', userAuth, async (req, res) => {
  await getReplyCommentLikes(req, res);
});

router.post('/likeReplyComment', userAuth, async (req, res) => {
  await likeReplyComment(req, res);
});

router.post('/unlikeReplyComment', userAuth, async (req, res) => {
  await unlikeReplyComment(req, res);
});

module.exports = router;
