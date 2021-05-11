const ShoppingCart = require('../../models/shopping-model/shopping-cart.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addToCart = async (req, res) => {
  try {
    if (req.body.quantity <= 0) {
      throw new Error('Invalid Quantity');
    }

    let cartItem = await ShoppingCart.findOne({
      product: req.body.product,
      sportizenUser: req.user.sportizenId,
    });

    if (!cartItem) {
      cartItem = new ShoppingCart({
        sportizenUser: req.user.sportizenId,
        product: req.body.product,
        quantity: req.body.quantity,
      });

      await cartItem.save();
    } else {
      await ShoppingCart.update(
        { product: req.body.product, sportizenUser: req.user.sportizenId },
        { $inc: { quantity: +req.body.quantity } }
      );
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addToCart;
