const express = require('express');
const userAuth = require('../../middleware/user-auth');

const addPostComment = require('../../controllers/post-controller/post-comment-controller/addPostComment');
const deletePostComment = require('../../controllers/post-controller/post-comment-controller/deletePostComment');
const getPostComments = require('../../controllers/post-controller/post-comment-controller/getPostComments');

const router = new express.Router();

router.post('/addPostComment', userAuth, async (req, res) => {
  await addPostComment(req, res);
});

router.post('/deletePostComment', userAuth, async (req, res) => {
  await deletePostComment(req, res);
});

router.post('/getPostComments', userAuth, async (req, res) => {
  await getPostComments(req, res);
});

module.exports = router;
