const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getPostLikes = require('../../controllers/post-like-controller/getPostLikes');
const likePost = require('../../controllers/post-like-controller/likePost');
const unlikePost = require('../../controllers/post-like-controller/unlikePost');

const router = new express.Router();

router.post('/getPostLikes', userAuth, async (req, res) => {
  await getPostLikes(req, res);
});

router.post('/likePost', userAuth, async (req, res) => {
  await likePost(req, res);
});

router.post('/unlikePost', userAuth, async (req, res) => {
  await unlikePost(req, res);
});

module.exports = router;
