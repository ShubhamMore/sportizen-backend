const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getBookmarkedPosts = require('../../controllers/post-controller/post-bookmark-controller/getBookmarkedPosts');
const addPostBookmark = require('../../controllers/post-controller/post-bookmark-controller/addPostBookmark');
const removePostBookmark = require('../../controllers/post-controller/post-bookmark-controller/removePostBookmark');

const router = new express.Router();

router.post('/getBookmarkedPosts', userAuth, async (req, res) => {
  await getBookmarkedPosts(req, res);
});

router.post('/addPostBookmark', userAuth, async (req, res) => {
  await addPostBookmark(req, res);
});

router.post('/removePostBookmark', userAuth, async (req, res) => {
  await removePostBookmark(req, res);
});

module.exports = router;
