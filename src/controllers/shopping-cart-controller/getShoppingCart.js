const ShoppingCart = require('../../models/shopping-model/shopping-cart.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addToCart = async (req, res) => {
  try {
    const cartItems = await ShoppingCart.aggregate([
      {
        $match: {
          sportizenUser: req.user.sportizenId,
        },
      },
    ]);

    responseHandler(cartItems, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addToCart;
