const express = require('express');
const auth = require('../middleware/auth');

const getPostLikes = require('../controllers/post-like-controller/getPostLikes');
const likePost = require('../controllers/post-like-controller/likePost');
const unlikePost = require('../controllers/post-like-controller/unlikePost');

const router = new express.Router();

router.post('/getPostLikes', auth, async (req, res) => {
  await getPostLikes(req, res);
});

router.post('/likePost', auth, async (req, res) => {
  await likePost(req, res);
});

router.post('/unlikePost', auth, async (req, res) => {
  await unlikePost(req, res);
});

module.exports = router;
