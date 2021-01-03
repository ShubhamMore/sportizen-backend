const express = require('express');
const auth = require('../middleware/auth');

const getPostViews = require('../controllers/post-view-controller/getPostViews');
const viewPost = require('../controllers/post-view-controller/viewPost');

const router = new express.Router();

router.post('/getPostViews', auth, async (req, res) => {
  await getPostViews(req, res);
});

router.post('/viewPost', auth, async (req, res) => {
  await viewPost(req, res);
});

module.exports = router;
