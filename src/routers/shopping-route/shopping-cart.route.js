const express = require('express');

const userAuth = require('../../middleware/user-auth');

const addToCart = require('../../controllers/shopping-cart-controller/addToCart');
const getShoppingCart = require('../../controllers/shopping-cart-controller/getShoppingCart');
const removeFromCart = require('../../controllers/shopping-cart-controller/removeFromCart');
const updateCartQuantity = require('../../controllers/shopping-cart-controller/updateCartQuantity');

const router = new express.Router();

router.post('/addToCart', userAuth, async (req, res) => {
  await addToCart(req, res);
});

router.post('/getShoppingCart', userAuth, async (req, res) => {
  await getShoppingCart(req, res);
});

router.post('/removeFromCart', userAuth, async (req, res) => {
  await removeFromCart(req, res);
});

router.post('/updateCartQuantity', userAuth, async (req, res) => {
  await updateCartQuantity(req, res);
});

module.exports = router;
