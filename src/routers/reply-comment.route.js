const express = require('express');
const auth = require('../middleware/auth');

const addPostCommentReply = require('../controllers/reply-comment-controller/addPostCommentReply');
const deletePostCommentReply = require('../controllers/reply-comment-controller/deletePostCommentReply');
const getPostReplyComments = require('../controllers/reply-comment-controller/getPostReplyComments');

const router = new express.Router();

router.post('/addPostCommentReply', auth, async (req, res) => {
  await addPostCommentReply(req, res);
});

router.post('/deletePostCommentReply', auth, async (req, res) => {
  await deletePostCommentReply(req, res);
});

router.post('/getPostReplyComments', auth, async (req, res) => {
  await getPostReplyComments(req, res);
});

module.exports = router;
