const express = require('express');

const auth = require('../../middleware/auth');

const getChats = require('../../controllers/chat-controller/getChats');

const router = new express.Router();

router.post('/getChats', auth, async (req, res) => {
  await getChats(req, res);
});

module.exports = router;
