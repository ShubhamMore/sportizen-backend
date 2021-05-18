const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getPostViews = require('../../controllers/post-controller/post-view-controller/getPostViews');
const viewPost = require('../../controllers/post-controller/post-view-controller/viewPost');

const router = new express.Router();

router.post('/getPostViews', userAuth, async (req, res) => {
  await getPostViews(req, res);
});

router.post('/viewPost', userAuth, async (req, res) => {
  await viewPost(req, res);
});

module.exports = router;
