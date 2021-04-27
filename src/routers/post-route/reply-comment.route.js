const express = require('express');
const userAuth = require('../../middleware/user-auth');

const addPostCommentReply = require('../../controllers/reply-comment-controller/addPostCommentReply');
const deletePostCommentReply = require('../../controllers/reply-comment-controller/deletePostCommentReply');
const getPostReplyComments = require('../../controllers/reply-comment-controller/getPostReplyComments');

const router = new express.Router();

router.post('/addPostCommentReply', userAuth, async (req, res) => {
  await addPostCommentReply(req, res);
});

router.post('/deletePostCommentReply', userAuth, async (req, res) => {
  await deletePostCommentReply(req, res);
});

router.post('/getPostReplyComments', userAuth, async (req, res) => {
  await getPostReplyComments(req, res);
});

module.exports = router;
