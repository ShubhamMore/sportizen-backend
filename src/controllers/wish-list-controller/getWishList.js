const WishList = require('../../models/shopping-model/wish-list.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addToCart = async (req, res) => {
  try {
    const wishListItems = await WishList.aggregate([
      {
        $match: {
          sportizenUser: req.user.sportizenId,
        },
      },
    ]);

    responseHandler(wishListItems, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addToCart;
