const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getMyPostGallery = require('../../controllers/post-controller/post-gallery-controller/getMyPostGallery');
const getUserPostGallery = require('../../controllers/post-controller/post-gallery-controller/getUserPostGallery');

const router = new express.Router();

router.post('/getMyPostGallery', userAuth, async (req, res) => {
  await getMyPostGallery(req, res);
});

router.post('/getUserPostGallery', userAuth, async (req, res) => {
  await getUserPostGallery(req, res);
});

module.exports = router;
