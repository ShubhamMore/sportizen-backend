const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getPostReplyCommentLikes = require('../../controllers/post-controller/post-reply-comment-like-controller/getPostReplyCommentLikes');
const likePostReplyComment = require('../../controllers/post-controller/post-reply-comment-like-controller/likePostReplyComment');
const unlikePostReplyComment = require('../../controllers/post-controller/post-reply-comment-like-controller/unlikePostReplyComment');

const router = new express.Router();

router.post('/getPostReplyCommentLikes', userAuth, async (req, res) => {
  await getPostReplyCommentLikes(req, res);
});

router.post('/likePostReplyComment', userAuth, async (req, res) => {
  await likePostReplyComment(req, res);
});

router.post('/unlikePostReplyComment', userAuth, async (req, res) => {
  await unlikePostReplyComment(req, res);
});

module.exports = router;
