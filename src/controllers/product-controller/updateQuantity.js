const Product = require('../../models/product-model/product.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updateProductQuantity = async (req, res) => {
  try {
    if (req.body.Stock <= 0) {
      throw new Error('Invalid Quantity');
    }

    const product = await Product.findByIdAndUpdate(req.body.product, {
      $inc: { stock: +req.body.stock },
    });

    if (!product) {
      throw new Error('Product Not Found');
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = updateProductQuantity;
