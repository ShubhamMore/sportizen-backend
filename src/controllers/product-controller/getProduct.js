const Product = require('../../models/product-model/product.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addProduct = async (req, res) => {
  try {
    const product = Product.findById(req.body.id);

    if (!product) {
      throw new Error('Product not Found');
    }

    responseHandler(product, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addProduct;
