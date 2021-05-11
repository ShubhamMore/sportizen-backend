const WishList = require('../../models/shopping-model/wish-list.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addToWishList = async (req, res) => {
  try {
    let wishListItem = await WishList.findOne({
      product: req.body.product,
      sportizenUser: req.user.sportizenId,
    });

    if (!wishListItem) {
      wishListItem = new WishList({
        sportizenUser: req.user.sportizenId,
        product: req.body.product,
      });

      await wishListItem.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addToWishList;
