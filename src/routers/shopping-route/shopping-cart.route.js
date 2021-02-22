const express = require('express');

const auth = require('../../middleware/auth');

const addToCart = require('../../controllers/shopping-cart-controller/addToCart');
const getShoppingCart = require('../../controllers/shopping-cart-controller/getShoppingCart');
const removeFromCart = require('../../controllers/shopping-cart-controller/removeFromCart');
const updateCartQuantity = require('../../controllers/shopping-cart-controller/updateCartQuantity');

const router = new express.Router();

router.post('/addToCart', auth, async (req, res) => {
  await addToCart(req, res);
});

router.post('/getShoppingCart', auth, async (req, res) => {
  await getShoppingCart(req, res);
});

router.post('/removeFromCart', auth, async (req, res) => {
  await removeFromCart(req, res);
});

router.post('/updateCartQuantity', auth, async (req, res) => {
  await updateCartQuantity(req, res);
});

module.exports = router;
