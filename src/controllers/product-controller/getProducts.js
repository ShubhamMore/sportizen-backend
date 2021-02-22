const Product = require('../../models/product-model/product.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addProduct = async (req, res) => {
  try {
    const products = Product.findById(req.body.id);

    responseHandler(products, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addProduct;
