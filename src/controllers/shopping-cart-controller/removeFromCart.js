const ShoppingCart = require('../../models/shopping-model/shopping-cart.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const removeFromCart = async (req, res) => {
  try {
    const cartItem = await ShoppingCart.findOneAndDelete({
      product: req.body.product,
      sportizenUser: req.user.sportizenId,
    });

    if (!cartItem) {
      throw new Error('Cart Item Not Found');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = removeFromCart;
