const express = require('express');

const auth = require('../../middleware/auth');

const addProduct = require('../../controllers/product-controller/addProduct');
const getProduct = require('../../controllers/product-controller/getProduct');
const getProducts = require('../../controllers/product-controller/getProducts');
const updateProduct = require('../../controllers/product-controller/updateProduct');
const updateQuantity = require('../../controllers/product-controller/updateQuantity');

const router = new express.Router();

router.post('/addProduct', auth, async (req, res) => {
  await addProduct(req, res);
});

router.post('/getProduct', auth, async (req, res) => {
  await getProduct(req, res);
});

router.post('/getProducts', auth, async (req, res) => {
  await getProducts(req, res);
});

router.post('/updateProduct', auth, async (req, res) => {
  await updateProduct(req, res);
});

router.post('/updateQuantity', auth, async (req, res) => {
  await updateQuantity(req, res);
});

module.exports = router;
