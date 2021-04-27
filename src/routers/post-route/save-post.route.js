const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getSavedPosts = require('../../controllers/save-post-controller/getSavedPosts');
const savePost = require('../../controllers/save-post-controller/savePost');
const unsavePost = require('../../controllers/save-post-controller/unsavePost');

const router = new express.Router();

router.post('/getSavedPosts', userAuth, async (req, res) => {
  await getSavedPosts(req, res);
});

router.post('/savePost', userAuth, async (req, res) => {
  await savePost(req, res);
});

router.post('/unsavePost', userAuth, async (req, res) => {
  await unsavePost(req, res);
});

module.exports = router;
