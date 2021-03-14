const express = require('express');
const auth = require('../../middleware/auth');

const getMyPostGallery = require('../../controllers/post-gallery-controller/getMyPostGallery');
const getUserPostGallery = require('../../controllers/post-gallery-controller/getUserPostGallery');

const router = new express.Router();

router.post('/getMyPostGallery', auth, async (req, res) => {
  await getMyPostGallery(req, res);
});

router.post('/getUserPostGallery', auth, async (req, res) => {
  await getUserPostGallery(req, res);
});

module.exports = router;
