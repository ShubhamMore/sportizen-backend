const express = require('express');
const auth = require('../middleware/auth');

const getSavedPosts = require('../controllers/save-post-controller/getSavedPosts');
const savePost = require('../controllers/save-post-controller/savePost');
const unlikePost = require('../controllers/save-post-controller/unsavePost');

const router = new express.Router();

router.post('/getSavedPosts', auth, async (req, res) => {
  await getSavedPosts(req, res);
});

router.post('/savePost', auth, async (req, res) => {
  await savePost(req, res);
});

router.post('/unlikePost', auth, async (req, res) => {
  await unlikePost(req, res);
});

module.exports = router;
