const WishList = require('../../models/shopping-model/wish-list.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const removeFromCart = async (req, res) => {
  try {
    const wishListItem = await WishList.findOneAndDelete({
      product: req.body.product,
      sportizenUser: req.user.sportizenId,
    });

    if (!wishListItem) {
      throw new Error('Wish List Item Not Found');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = removeFromCart;
