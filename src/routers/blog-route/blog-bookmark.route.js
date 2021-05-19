const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getBookmarkedBlogs = require('../../controllers/blog-controller/blog-bookmark-controller/getBookmarkedBlogs');
const addBlogBookmark = require('../../controllers/blog-controller/blog-bookmark-controller/addBlogBookmark');
const removeBlogBookmark = require('../../controllers/blog-controller/blog-bookmark-controller/removeBlogBookmark');

const router = new express.Router();

router.post('/getBookmarkedBlogs', userAuth, async (req, res) => {
  await getBookmarkedBlogs(req, res);
});

router.post('/addBlogBookmark', userAuth, async (req, res) => {
  await addBlogBookmark(req, res);
});

router.post('/removeBlogBookmark', userAuth, async (req, res) => {
  await removeBlogBookmark(req, res);
});

module.exports = router;
