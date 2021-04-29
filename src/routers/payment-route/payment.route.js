const express = require('express');

const userAuth = require('../../middleware/user-auth');

const verifyPayment = require('../../controllers/payment-controller/verifyPayment');

const router = new express.Router();

router.post('/verifyPayment', userAuth, async (req, res) => {
  await verifyPayment(req, res);
});

module.exports = router;
