const express = require('express');

const userAuth = require('../../middleware/user-auth');

const generateOrder = require('../../controllers/order-controller/generateOrder');
const deleteOrder = require('../../controllers/order-controller/deleteOrder');

const router = new express.Router();

router.post('/generateOrder', userAuth, async (req, res) => {
  await generateOrder(req, res);
});

router.post('/deleteOrder', userAuth, async (req, res) => {
  await deleteOrder(req, res);
});

module.exports = router;
