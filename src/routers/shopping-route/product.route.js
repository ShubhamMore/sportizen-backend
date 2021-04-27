const express = require('express');

const userAuth = require('../../middleware/user-auth');

const addProduct = require('../../controllers/product-controller/addProduct');
const getProduct = require('../../controllers/product-controller/getProduct');
const getProducts = require('../../controllers/product-controller/getProducts');
const updateProduct = require('../../controllers/product-controller/updateProduct');
const updateQuantity = require('../../controllers/product-controller/updateQuantity');

const router = new express.Router();

router.post('/addProduct', userAuth, async (req, res) => {
  await addProduct(req, res);
});

router.post('/getProduct', userAuth, async (req, res) => {
  await getProduct(req, res);
});

router.post('/getProducts', userAuth, async (req, res) => {
  await getProducts(req, res);
});

router.post('/updateProduct', userAuth, async (req, res) => {
  await updateProduct(req, res);
});

router.post('/updateQuantity', userAuth, async (req, res) => {
  await updateQuantity(req, res);
});

module.exports = router;
