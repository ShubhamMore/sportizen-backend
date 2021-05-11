const ShoppingCart = require('../../models/shopping-model/shopping-cart.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updateCartQuantity = async (req, res) => {
  try {
    if (req.body.quantity <= 0) {
      throw new Error('Invalid Quantity');
    }

    const cartItem = await ShoppingCart.findOneAndUpdate(
      { product: req.body.product, sportizenUser: req.user.sportizenId },
      { $inc: { quantity: +req.body.quantity } }
    );

    if (!cartItem) {
      throw new Error('Cart Item Not Found');
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = updateCartQuantity;
